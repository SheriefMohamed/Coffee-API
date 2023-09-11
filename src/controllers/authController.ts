import asyncHandler from 'express-async-handler';
import { NextFunction } from "express";
import { RequestWithBody } from "../interfaces/RequestWithBody";
import { CustomResponse, Json } from '../types/customResponse';
import { StaffService } from './../services/staff-service';
import { stafftokenData } from '../interfaces/Staff';
import { sendToken } from '../utils/jwtToken';
import { ErrorTracker } from '../middlewares/errorTracker';
import { comparePasswords } from '../utils/hashPassword';

export class AuthController{
    public staffService: StaffService;
    
    constructor(){
        this.staffService = new StaffService()
    }

    Login = asyncHandler(async (req: RequestWithBody, res:CustomResponse<Json>, next: NextFunction) => {
        const {email, password} = req.body;

        if(email && password){
            const staffTokenData = await this.staffService.getStaffTokenData(email) as stafftokenData;
            if(!staffTokenData){
                return next(new ErrorTracker('user not found',404))
            }
            if(staffTokenData.password){
                if(!await comparePasswords(password,staffTokenData.password)){
                    return next(new ErrorTracker('password not match',404))
                }
            }
            sendToken(staffTokenData, res)
        } else{
            return next(new ErrorTracker('please select email and password',404))
        }
    })

    Logout = asyncHandler(async (req: RequestWithBody, res:CustomResponse<Json>, next: NextFunction) => {
        res.cookie('token', null, {
            expires: new Date(Date.now()),
            httpOnly: true
        })
    
        res.status(200).json({
            success: true,
            message: 'Logged out'
        })

    })

    checkAccess = asyncHandler(async (req: RequestWithBody, res:CustomResponse<Json>, next: NextFunction) => {
        res.json({
            message: 'Accessed !',
            data: req.staff
        })
    })
}