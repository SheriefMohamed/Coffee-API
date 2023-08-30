import Joi from 'joi';
import { Category } from '../../interfaces/Category';

const categorySchema = Joi.object<Category>({
    name: Joi.string().required().messages({
        'string.base': 'name must be a string',
        'any.required': 'name is required',}),
});

export const validateCategory = (item: Category) => {
    const { error } = categorySchema.validate(item);
    return error ? error.details.map(detail => detail.message) : null;
};