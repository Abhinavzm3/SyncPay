import { Router } from 'express';
import { createExpense, createMember, fetchCurrentTrip } from '../controllers/tripController.js';

const router = Router();
router.get('/trips/current', fetchCurrentTrip);
router.post('/members', createMember);
router.post('/expenses', createExpense);

export default router;
