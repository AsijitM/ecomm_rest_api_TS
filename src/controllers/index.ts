import { Router } from 'express';
import authRoutes from '../routes/auth';

const rootRouter: Router = Router();

rootRouter.use('/auth', authRoutes);

export default rootRouter;
