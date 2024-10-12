import { Router } from 'express';
import * as cartController from '../controllers/cartController.js';
import { authToken } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/add', authToken, cartController.addToCart);
router.get('/:userId', authToken, cartController.getCart);
router.delete('/delete', authToken, cartController.deleteFromCart);

export default router;