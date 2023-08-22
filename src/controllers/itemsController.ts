import { Response, NextFunction } from "express";
import { RequestWithBody } from "../interfaces/RequestWithBody";
import { ItemsService } from "../services/items-service";
import asyncHandler from 'express-async-handler';
import { Item } from "../interfaces/Item";
import { ErrorTracker } from "../middlewares/errorTracker";

interface Json {
    success: boolean;
    data: Item | Item[];
    message?: string
}

type CustomResponse<T> = Response & {
    json: (body?: T) => CustomResponse<T>;
}

export class ItemsController{
    public itemsService: ItemsService;
    
    constructor(){
        this.itemsService = new ItemsService()
    }

    insertItem = asyncHandler(async (req: RequestWithBody, res: CustomResponse<Json>) => {
        const {name, category, price} = req.body;
        if(name && category && price){
            await this.itemsService.insertItem({
                name: String(name), 
                category: String(category),
                price: parseFloat(price)
            })
            res.json({'success': true, message: 'Item inserted !'})  
        }
        res.json({'success': false, message: 'Error !'})
    });

    getAllItems = asyncHandler(async (req: RequestWithBody, res: CustomResponse<Json>, next: NextFunction) => {
        const items = await this.itemsService.getAllItems()

        res.json({'success': true, data: items})  
        return
    });

    getSingleItem = asyncHandler(async (req: RequestWithBody, res: CustomResponse<Json>) => {
        const itemId: number = parseInt(req.params.itemId)
        const item = await this.itemsService.getSingleItem(itemId)
        
        res.json({'success': true, data: item})   
        return   
    });

    updatedItem = asyncHandler(async (req: RequestWithBody, res: CustomResponse<Json>) => {
        const {name, category, price} = req.body;
        if(name && category && price && req.params.itemId){
            const itemId: number = parseInt(req.params.itemId)
            await this.itemsService.updateItem(itemId,{
                name: String(name), 
                category: String(category),
                price: parseFloat(price)
            })
            res.json({'success': true, message: 'Item updated !'})
            return
        }
        res.json({'success': false, message: 'Error !'})
        return
    });

    deleteItem = asyncHandler(async (req: RequestWithBody, res: CustomResponse<Json>) => {
        const itemId: number = parseInt(req.params.itemId)
        const item = await this.itemsService.deleteItem(itemId)
        
        res.json({'success': true, message: 'Item deleted !'})     
        return 
    });
}


// next(new ErrorTracker('Any error !', 404))
// return