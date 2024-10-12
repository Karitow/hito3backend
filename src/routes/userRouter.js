import { Router } from 'express';
import * as usersController from '../controllers/userController.js'
import { authToken } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/register', usersController.register);
router.post('/login', usersController.login);
router.get('/usuario', authToken, usersController.findProfile);
router.put('/usuario/:id', authToken, usersController.updateProfile);
router.delete('/usuario/:id', authToken, usersController.deleteProfile);

export default router;