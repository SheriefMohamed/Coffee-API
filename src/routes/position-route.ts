import { Router } from 'express';
import { PositionsController } from '../controllers/positionsController';

export const PositionRoute = Router()

const positionController = new PositionsController();

PositionRoute
    .route('/')
    .get(positionController.getAllPositions)
    .post(positionController.insertPosition)

PositionRoute
    .route('/:positionId')
    .get(positionController.getSinglePosition)
    .put(positionController.updatedPosition)