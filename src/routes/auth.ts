import { errorHandler } from '../error-handler';
import { login, signup } from '../controllers/auth';

import { Router } from 'express';
import authMiddleware from '../middlewares/auth';

const authRoutes: Router = Router();

authRoutes.post('/signup', errorHandler(signup));
authRoutes.post('/login', errorHandler(login));
authRoutes.get('/me', [authMiddleware], errorHandler(login));

export default authRoutes;
