import  asyncHandler  from 'express-async-handler';
import { ErrorTracker } from './errorTracker';
import { RequestWithBody } from '../interfaces/RequestWithBody';
import { CustomResponse, Json } from '../types/customResponse';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { JWT_SECRET } from '../config/config';
import { NextFunction } from 'express';
import { StaffService } from './../services/staff-service';
import { stafftokenData } from '../interfaces/Staff';

export const isAuthenticated = asyncHandler(async (req: RequestWithBody, res: CustomResponse<Json>, next: NextFunction) => {
    const {token} = req.cookies;

    if(!token) return next(new ErrorTracker('Login first to access this resource', 401));

    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload
    const staffService = new StaffService()
    req.staff = await staffService.getStaffTokenData(decoded.email) as stafftokenData
    delete req.staff.password
    next();
})

export const authorizeRoles = (role: string) => {
    return (req: RequestWithBody, res: CustomResponse<Json>, next: NextFunction) => {
        if(req.staff){
            if(role != req.staff.position){
                return next(new ErrorTracker(`Role ${req.staff.position} is not allowed to access this resource`, 400));
            }
            next();
        }else{
            return next(new ErrorTracker('Login first to access this resource', 401));
        }
    }
}