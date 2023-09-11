import { NextFunction } from "express";
import { RequestWithBody } from "../interfaces/RequestWithBody";
import { PositionService } from "../services/position-service";
import asyncHandler from 'express-async-handler';
import { Position } from "../interfaces/Position";
import { ErrorTracker } from "../middlewares/errorTracker";
import { validatePosition } from './../utils/validators/positionValidator';
import {Json, CustomResponse} from '../types/customResponse'

export class PositionsController{
    public positionService: PositionService;
    
    constructor(){
        this.positionService = new PositionService()
    }

    insertPosition = asyncHandler(async (req: RequestWithBody, res: CustomResponse<Json>, next: NextFunction) => {
        const {name} = req.body;
        
        if(name){
            const position: Position = {
                name: name
            };
            const validationError = validatePosition(position)
    
            if (validationError) {
                return next(new ErrorTracker(validationError.join(', '), 400));
            }
    
            await this.positionService.insertPosition(position)
            res.json({'success': true, message: 'Position inserted !'})
            return
        }
        
        return next(new ErrorTracker('Invalid input types', 400));
    });

    getAllPositions = asyncHandler(async (req: RequestWithBody, res: CustomResponse<Json>, next: NextFunction) => {
        const positions = await this.positionService.getAllPositions()

        res.json({'success': true, data: positions})  
        return
    });

    getSinglePosition = asyncHandler(async (req: RequestWithBody, res: CustomResponse<Json>, next: NextFunction) => { 
        if(!/^\d+$/.test(req.params.positionId)){
            next(new ErrorTracker("Position Id Should be a number !", 400))
            return
        }
        
        const positionId: number = parseInt(req.params.positionId)
        const position = await this.positionService.getSinglePosition(positionId)
            
        if(!position){
            next(new ErrorTracker('No positions found !', 404))
            return
        }
        
        res.json({'success': true, data: position})   
        return
    });

    updatedPosition = asyncHandler(async (req: RequestWithBody, res: CustomResponse<Json>, next: NextFunction) => {
        const {name} = req.body;

        if(name && req.params.positionId){
            if(!/^\d+$/.test(req.params.positionId)){
                next(new ErrorTracker("Position Id Should be a number !", 400))
                return
            }

            const positionId: number = parseInt(req.params.positionId)
            const position: Position = {
                name: name
            };

            const validationError = validatePosition(position)   
            if (validationError) {
                return next(new ErrorTracker(validationError.join(', '), 400));
            }
            
            const rows = await this.positionService.updatePosition(positionId, position)
            if(rows == 0){
                next(new ErrorTracker('No positions found !', 404))
                return
            }

            res.json({'success': true, message: 'Position updated !'})
            return
        }

        return next(new ErrorTracker('Invalid input types', 400));
    });
}