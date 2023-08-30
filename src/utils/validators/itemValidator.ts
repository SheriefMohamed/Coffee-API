import Joi, { string } from 'joi';
import { Item } from '../../interfaces/Item';
import { categoryService } from './../../services/category-service';

const itemSchema = Joi.object<Item>({
    name: Joi.string().required().messages({
        'string.base': 'name must be a string',
        'any.required': 'name is required',}),
    category: Joi.string().required().messages({
        'string.base': 'category must be a string',
        'any.required': 'category is required',}),
    price: Joi.number().required().messages({
        'number.base': 'price must be a number',
        'any.required': 'price is required',}),
});

export const validateItem = async (item: Item) => {
    const { error } = itemSchema.validate(item);

    if(error){
        return error.details.map(detail => detail.message);
    }

    const categoryservice = new categoryService();
    const result = await categoryservice.getArrayOfCategories()
    if(!result.includes(item.category)){
        return ['category must be one of the valid categories'];
    }
};