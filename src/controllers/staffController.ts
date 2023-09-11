import { NextFunction } from "express";
import { RequestWithBody } from "../interfaces/RequestWithBody";
import asyncHandler from 'express-async-handler';
import { StaffService } from './../services/staff-service';
import { Staff, StaffPass } from "../interfaces/Staff";
import { ErrorTracker } from "../middlewares/errorTracker";
import { validateStaff } from "../utils/validators/staffValidator";
import {Json, CustomResponse} from '../types/customResponse'
import { hashPassword, comparePasswords } from "../utils/hashPassword";


export class StaffController{
    public staffService: StaffService;
    
    constructor(){
        this.staffService = new StaffService()
    }

    insertStaffMember = asyncHandler(async (req: RequestWithBody, res: CustomResponse<Json>, next: NextFunction) => {
        const {fullname, email, password, salary, position} = req.body;
        
        if(fullname && email && password && salary && position ){
            const staff: Staff = {
                fullname: fullname,
                email: email,
                password: await hashPassword(password),
                salary: parseFloat(salary),
                position: position
            };
            const validationError = await validateStaff(staff)
    
            if (validationError) {
                return next(new ErrorTracker(validationError.join(', '), 400));
            }
    
            await this.staffService.insertStaffMember(staff)
            res.json({'success': true, message: 'Staff Member inserted !'})
            return
        }
        
        return next(new ErrorTracker('Invalid input types', 400));
    });

    getAllStaffMembers = asyncHandler(async (req: RequestWithBody, res: CustomResponse<Json>, next: NextFunction) => {
        const staff = await this.staffService.getAllStaffMembers()

        res.json({'success': true, data: staff})  
        return
    });

    getSingleStaffMember = asyncHandler(async (req: RequestWithBody, res: CustomResponse<Json>, next: NextFunction) => { 
        if(!/^\d+$/.test(req.params.staffId)){
            next(new ErrorTracker("Staff Id Should be a number !", 400))
            return
        }
        
        const staffId: number = parseInt(req.params.staffId)
        const staff = await this.staffService.getSingleStaffMember(staffId)
            
        if(!staff){
            next(new ErrorTracker('No staff found !', 404))
            return
        }
        
        res.json({'success': true, data: staff})   
        return
    });

    updatedStaffMember = asyncHandler(async (req: RequestWithBody, res: CustomResponse<Json>, next: NextFunction) => {
        const {fullname, email, password, salary, position} = req.body;

        if(fullname && email && salary && position && req.params.staffId){
            if(!/^\d+$/.test(req.params.staffId)){
                next(new ErrorTracker("Staff Id Should be a number !", 400))
                return
            }

            const staffId: number = parseInt(req.params.staffId)
            const staff: Staff = {
                fullname: fullname,
                email: email,
                password: ' ',
                salary: parseFloat(salary),
                position: position
            };

            const validationError = await validateStaff(staff)   
            if (validationError) {
                return next(new ErrorTracker(validationError.join(', '), 400));
            }
            
            const rows = await this.staffService.updateStaffMember(staffId, staff)
            if(rows == 0){
                next(new ErrorTracker('No staff found !', 404))
                return
            }

            res.json({'success': true, message: 'Staff updated !'})
            return
        }

        return next(new ErrorTracker('Invalid input types', 400));
    });

    updatedStaffMemberPassword = asyncHandler(async (req: RequestWithBody, res: CustomResponse<Json>, next: NextFunction) => {
        const {password} = req.body;

        if(password && req.params.staffId){
            if(!/^\d+$/.test(req.params.staffId)){
                next(new ErrorTracker("Staff Id Should be a number !", 400))
                return
            }

            const staffId: number = parseInt(req.params.staffId)
            const staff: StaffPass = {
                password: await hashPassword(password)
            };
            
            const rows = await this.staffService.updateStaffMemberPassword(staffId, staff)
            if(rows == 0){
                next(new ErrorTracker('No staff found !', 404))
                return
            }

            res.json({'success': true, message: 'Staff updated !'})
            return
        }

        return next(new ErrorTracker('Invalid input types', 400));
    });
}