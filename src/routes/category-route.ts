import { Router } from 'express';
import { CategoriesController } from '../controllers/categoriesController';

export const CategoryRoute = Router()

const categoriesController = new CategoriesController();

CategoryRoute
    .route('/')
    .get(categoriesController.getAllCategories)
    .post(categoriesController.insertCategory)

CategoryRoute
    .route('/:categoryId')
    .get(categoriesController.getSingleCategory)
    .put(categoriesController.updatedCategory)