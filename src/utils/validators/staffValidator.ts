import Joi from 'joi';
import { Staff } from './../../interfaces/Staff';
import { PositionService } from '../../services/position-service';
import { StaffService } from '../../services/staff-service';

const staffSchema = Joi.object<Staff>({
    fullname: Joi.string().required().messages({
        'string.base': 'fullname must be a string',
        'any.required': 'fullname is required',}),
    email: Joi.string().email({ tlds: { allow: false } }).required()
    .custom(async (value: string, helpers: Joi.CustomHelpers) => {
        const staffService = new StaffService();
        const emailExists = await staffService.emailIsExists(value);
        console.log(emailExists)
        if (emailExists) {
            return helpers.error('any.custom');
        }
        return value;
    })
    .messages({
        'string.base': 'email must be a string',
        'string.email': 'email should be in right format',
        'any.required': 'email is required',
        'any.custom': 'email is already exists',}),
    password: Joi.string().required().messages({
        'string.base': 'password must be a string',
        'any.required': 'password is required',}),
    salary: Joi.number().required().messages({
        'number.base': 'salary must be a number',
        'any.required': 'salary is required',}),
    position: Joi.string().required().messages({
        'string.base': 'position must be a string',
        'any.required': 'position is required',}),
});

export const validateStaff = async (staff: Staff) => {
    const { error } = staffSchema.validate(staff);

    if(error){
        return error.details.map(detail => detail.message);
    }

    const positionservice = new PositionService();
    const result = await positionservice.getArrayOfPositions()
    if(!result.includes(staff.position)){
        return ['position must be one of the valid positions'];
    }
};