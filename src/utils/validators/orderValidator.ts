import Joi from 'joi';
import { Order } from '../../interfaces/Order';
import { ItemsService } from '../../services/items-service';

const orderSchema = Joi.object({
    table_number: Joi.number().required().messages({
        'number.base': 'table_number must be a number',
        'any.required': 'table_number is required',}),
    staff_id: Joi.number().required().messages({
        'string.base': 'staff_id must be a number',
        'any.required': 'staff_id is required',}),
    items: Joi.array()
    .items(
        Joi.object({
            item_id: Joi.number().required().messages({
                'number.base': 'item_id must be a number',
                'any.required': 'item_id is required',}),
            quantity: Joi.number().integer().min(1).required().messages({
                'number.base': 'quantity must be a number',
                'any.required': 'quantity is required',
                'number.min': 'quantity must be at least 1',}),
        })
    )
    .required().messages({
        'array.base': 'items must be an array of items',
        'any.required': 'items is required',}),
});

export const validateOrder = async (order: Order) => {
    const { error } = orderSchema.validate(order);
    
    if(error){
        return error.details.map(detail => detail.message);
    }

    const itemsService = new ItemsService();
    const result = await itemsService.getArrayOfItems()
    let flag = false;
    order.items.forEach(item => {
        if(!result.includes(item.item_id)){
            flag = true
        }
    })
    if(flag){
        return ['item_id must be one of the valid items'];
    }
};