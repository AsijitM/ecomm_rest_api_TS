import { NextFunction, Request, Response } from 'express';
import { UnauthorizedException } from '../exceptions/unauthorized';
import { ErrorCode } from '../exceptions/root';
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../secrets';
import { prismaClient } from '..';

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // 1. extract the token from header
  const token = req.headers.authorization!;
  // 2. If token is not present throw an error
  if (!token) {
    next(new UnauthorizedException('Unauthorized', ErrorCode.UNAUTHORIZED));
  }
  try {
    // 3. verify if token present
    const payload = jwt.verify(token, JWT_SECRET) as any;
    // 4. to get the user from the payload
    const user = await prismaClient.user.findFirst({
      where: { id: payload.userId },
    });
    if (!user) {
      next(new UnauthorizedException('Unauthorized', ErrorCode.UNAUTHORIZED));
    }
    // 5. to attach the use to the current req obj
    req.user = user;
    next();
  } catch (error) {
    next(new UnauthorizedException('Unauthorized', ErrorCode.UNAUTHORIZED));
  }
};

export default authMiddleware;
