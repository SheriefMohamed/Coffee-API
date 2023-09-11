import { Router} from 'express';
import { StaffController } from '../controllers/staffController';

export const StaffRoute = Router()

const staffController = new StaffController();

StaffRoute
    .route('/')
    .get(staffController.getAllStaffMembers)
    .post(staffController.insertStaffMember)

StaffRoute
    .route('/:staffId')
    .get(staffController.getSingleStaffMember)
    .put(staffController.updatedStaffMember)

StaffRoute
    .route('/password/:staffId')
    .put(staffController.updatedStaffMemberPassword)