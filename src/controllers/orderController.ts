import { RequestWithBody } from "../interfaces/RequestWithBody";
import { OrderService } from "../services/order-service";
import asyncHandler from 'express-async-handler';
import { CustomResponse, Json } from "../types/customResponse";
import { NextFunction } from "express";
import { validateOrder } from "../utils/validators/orderValidator";
import { ErrorTracker } from "../middlewares/errorTracker";
import { Order } from "../interfaces/Order";

export class OrderController{
    public orderService: OrderService;
    
    constructor(){
        this.orderService = new OrderService();
    }

    insertOrder = asyncHandler(async (req: RequestWithBody, res: CustomResponse<Json>, next: NextFunction) => {
        const {table_number, items} = req.body;

        if(table_number && items && Array.isArray(items) && req.staff){
            const order: Order = {
                table_number: table_number,
                staff_id: req.staff.id,
                items: items,
            };
            const validationError = await validateOrder(order)
    
            if (validationError) {
                return next(new ErrorTracker(validationError.join(', '), 400));
            }
            
            await this.orderService.insertOrder({
                table_number: 3,
                staff_id: 1,
                items: [{item_id: 3, quantity: 2}, {item_id: 1, quantity: 1}, {item_id: 2, quantity: 1}]
            })

            res.json({'success': true, message: 'Order Done !'})
        } else {
            return next(new ErrorTracker('table_number and items[] required', 400));
        }
    })
}