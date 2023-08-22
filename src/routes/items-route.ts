import { Router, Request, Response, NextFunction } from 'express';
import { ItemsController } from '../controllers/itemsController';

export const ItemsRoute = Router()

const itemsController = new ItemsController();

ItemsRoute
    .route('/')
    .get(itemsController.getAllItems)
    .post(itemsController.insertItem)

ItemsRoute
    .route('/:itemId')
    .get(itemsController.getSingleItem)
    .delete(itemsController.deleteItem)
    .put(itemsController.updatedItem)