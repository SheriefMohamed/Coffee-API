import Joi from 'joi';
import { Position } from './../../interfaces/Position';

const positionSchema = Joi.object<Position>({
    name: Joi.string().required().messages({
        'string.base': 'name must be a string',
        'any.required': 'name is required',}),
});

export const validatePosition = (position: Position) => {
    const { error } = positionSchema.validate(position);
    return error ? error.details.map(detail => detail.message) : null;
};