import { Response, NextFunction } from "express";
import { RequestWithBody } from "../interfaces/RequestWithBody";
import { ItemsService } from "../services/items-service";
import asyncHandler from 'express-async-handler';
import { Item } from "../interfaces/Item";
import { ErrorTracker } from "../middlewares/errorTracker";
import { validateItem } from "../utils/validators/itemValidator";
import {Json, CustomResponse} from '../types/customResponse'

export class ItemsController{
    public itemsService: ItemsService;
    
    constructor(){
        this.itemsService = new ItemsService()
    }

    insertItem = asyncHandler(async (req: RequestWithBody, res: CustomResponse<Json>, next: NextFunction) => {
        const {name, category, price} = req.body;
        
        if(name && category && price ){
            const item: Item = {
                name: name,
                category: category,
                price: parseFloat(price),
            };
            const validationError = validateItem(item)
    
            if (validationError) {
                return next(new ErrorTracker(validationError.join(', '), 400));
            }
    
            await this.itemsService.insertItem(item)
            res.json({'success': true, message: 'Item inserted !'})
            return
        }
        
        return next(new ErrorTracker('Invalid input types', 400));
    });

    getAllItems = asyncHandler(async (req: RequestWithBody, res: CustomResponse<Json>, next: NextFunction) => {
        const items = await this.itemsService.getAllItems()

        res.json({'success': true, data: items})  
        return
    });

    getSingleItem = asyncHandler(async (req: RequestWithBody, res: CustomResponse<Json>, next: NextFunction) => { 
        if(!/^\d+$/.test(req.params.itemId)){
            next(new ErrorTracker("Item Id Should be a number !", 400))
            return
        }
        
        const itemId: number = parseInt(req.params.itemId)
        const item = await this.itemsService.getSingleItem(itemId)
            
        if(!item){
            next(new ErrorTracker('No items found !', 404))
            return
        }
        
        res.json({'success': true, data: item})   
        return
    });

    updatedItem = asyncHandler(async (req: RequestWithBody, res: CustomResponse<Json>, next: NextFunction) => {
        const {name, category, price} = req.body;

        if(name && category && price && req.params.itemId){
            if(!/^\d+$/.test(req.params.itemId)){
                next(new ErrorTracker("Item Id Should be a number !", 400))
                return
            }

            const itemId: number = parseInt(req.params.itemId)
            const item: Item = {
                name: name,
                category: category,
                price: parseFloat(price),
            };

            const validationError = validateItem(item)   
            if (validationError) {
                return next(new ErrorTracker(validationError.join(', '), 400));
            }
            
            const rows = await this.itemsService.updateItem(itemId, item)
            if(rows == 0){
                next(new ErrorTracker('No items found !', 404))
                return
            }

            res.json({'success': true, message: 'Item updated !'})
            return
        }

        return next(new ErrorTracker('Invalid input types', 400));
    });

    deleteItem = asyncHandler(async (req: RequestWithBody, res: CustomResponse<Json>, next: NextFunction) => {
        if(!/^\d+$/.test(req.params.itemId)){
            next(new ErrorTracker("Item Id Should be a number !", 400))
            return
        }

        const itemId: number = parseInt(req.params.itemId)
        const rows = await this.itemsService.deleteItem(itemId)

        if(rows == 0){
            next(new ErrorTracker('No items found !', 404))
            return
        }

        res.json({'success': true, message: 'Item deleted !'})     
        return 
    });
}


// next(new ErrorTracker('Any error !', 404))
// return