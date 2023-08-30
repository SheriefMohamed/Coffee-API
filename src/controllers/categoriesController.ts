import { NextFunction } from "express";
import { RequestWithBody } from "../interfaces/RequestWithBody";
import { categoryService } from "../services/category-service";
import asyncHandler from 'express-async-handler';
import { Category } from "../interfaces/Category";
import { ErrorTracker } from "../middlewares/errorTracker";
import { validateCategory } from "../utils/validators/categoryValidator";
import {Json, CustomResponse} from '../types/customResponse'

export class CategoriesController{
    public categoryService: categoryService;
    
    constructor(){
        this.categoryService = new categoryService()
    }

    insertCategory = asyncHandler(async (req: RequestWithBody, res: CustomResponse<Json>, next: NextFunction) => {
        const {name} = req.body;
        
        if(name){
            const category: Category = {
                name: name
            };
            const validationError = validateCategory(category)
    
            if (validationError) {
                return next(new ErrorTracker(validationError.join(', '), 400));
            }
    
            await this.categoryService.insertCategory(category)
            res.json({'success': true, message: 'Category inserted !'})
            return
        }
        
        return next(new ErrorTracker('Invalid input types', 400));
    });

    getAllCategories = asyncHandler(async (req: RequestWithBody, res: CustomResponse<Json>, next: NextFunction) => {
        const categories = await this.categoryService.getAllCategories()

        res.json({'success': true, data: categories})  
        return
    });

    getSingleCategory = asyncHandler(async (req: RequestWithBody, res: CustomResponse<Json>, next: NextFunction) => { 
        if(!/^\d+$/.test(req.params.categoryId)){
            next(new ErrorTracker("Category Id Should be a number !", 400))
            return
        }
        
        const categoryId: number = parseInt(req.params.categoryId)
        const category = await this.categoryService.getSingleCategory(categoryId)
            
        if(!category){
            next(new ErrorTracker('No catigories found !', 404))
            return
        }
        
        res.json({'success': true, data: category})   
        return
    });

    updatedCategory = asyncHandler(async (req: RequestWithBody, res: CustomResponse<Json>, next: NextFunction) => {
        const {name} = req.body;

        if(name && req.params.categoryId){
            if(!/^\d+$/.test(req.params.categoryId)){
                next(new ErrorTracker("Category Id Should be a number !", 400))
                return
            }

            const categoryId: number = parseInt(req.params.categoryId)
            const category: Category = {
                name: name
            };

            const validationError = validateCategory(category)   
            if (validationError) {
                return next(new ErrorTracker(validationError.join(', '), 400));
            }
            
            const rows = await this.categoryService.updateCategory(categoryId, category)
            if(rows == 0){
                next(new ErrorTracker('No catigories found !', 404))
                return
            }

            res.json({'success': true, message: 'Category updated !'})
            return
        }

        return next(new ErrorTracker('Invalid input types', 400));
    });
}