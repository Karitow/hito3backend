import { Router } from 'express';
import * as orderController from '../controllers/orderController.js';
import { authToken } from '../middlewares/auth.middleware.js';

const orderRouter = Router();

orderRouter.post('/', authToken, orderController.createOrder);
orderRouter.get('/:orderId', authToken, orderController.getOrder);
orderRouter.get('/user/:userId', authToken, orderController.getAllOrders);
orderRouter.put('/:orderId', authToken, orderController.updateOrder);
orderRouter.delete('/:orderId', authToken, orderController.deleteOrder);

export default orderRouter;
