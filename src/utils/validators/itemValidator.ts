import Joi from 'joi';
import { Item } from '../../interfaces/Item';

const itemSchema = Joi.object<Item>({
    name: Joi.string().required().messages({
        'string.base': 'name must be a string',
        'any.required': 'name is required',}),
    category: Joi.string().valid('hot drinks', 'cold drinks').required().messages({
        'string.base': 'category must be a string',
        'any.only': 'category must be one of [ hot drinks, cold drinks ]',
        'any.required': 'category is required',}),
    price: Joi.number().required().messages({
        'number.base': 'price must be a number',
        'any.required': 'price is required',}),
});

export const validateItem = (item: Item) => {
    const { error } = itemSchema.validate(item);
    return error ? error.details.map(detail => detail.message) : null;
};