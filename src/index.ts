import express, { Express } from 'express';
import { PORT } from './secrets';
import rootRouter from './controllers';
import { PrismaClient } from '@prisma/client';

const app: Express = express();

app.use(express.json());
app.use('/api', rootRouter);

export const prismaClient = new PrismaClient({
  log: ['query'],
});

app.listen(PORT, () => {
  console.log('Server is running');
});