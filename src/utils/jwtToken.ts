import jwt from 'jsonwebtoken';
import { JWT_EXPIRES_TIME, JWT_SECRET, COOKIE_EXPIRES_TIME } from '../config/config';
import { Json, CustomResponse } from '../types/customResponse';
import { stafftokenData } from './../interfaces/Staff';

export function sendToken (stafftoeknData: stafftokenData, res: CustomResponse<Json>) {
    delete stafftoeknData.password
    const token = jwt.sign(stafftoeknData, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_TIME
    })

    const options = {
        expires: new Date(
            Date.now() + COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    }

    res.cookie('token', token, options).json({
        success: true,
        token,
        message: "Logged In !"
    })
}