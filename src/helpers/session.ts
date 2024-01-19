import * as jwt from 'jsonwebtoken';
import { JWT_SECRET_TOKEN } from '../../config/token';
import User from '../../models/User';
import { Request, Response, NextFunction } from 'express';
import { ErrorHandler } from '../utils/handlers';
import * as uuid from 'uuid';

// this is indepedent of user
export const generateDbToken = () => {
  return uuid.v1() + '-gogocode-' + uuid.v4() + Math.random();
};

export const generateJWTToken = (token: string, expirationDays?: string): string => {
  let expiresIn = { expiresIn: expirationDays };
  if (expirationDays) {
    expiresIn = {
      expiresIn: expirationDays,
    };
  }

  return jwt.sign(
    {
      token,
      ...expiresIn,
    },
    JWT_SECRET_TOKEN,
    { ...expiresIn },
  );
};

export const extractAuthToken = (req): string => {
  const authorization = req.headers.authorization || '';
  return authorization.split(' ')[1];
};

export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, JWT_SECRET_TOKEN, async (err: any, user: any) => {
      if (err) {
        console.log('Error', err);
        return ErrorHandler.response(res, 401, 'Unauthorised', null);
      }
      try {
        const userDb = await User.findOne({ where: { id: user.userId } });
        res.locals.user = userDb;
        next();
      } catch (e) {
        ErrorHandler.response(res, 401, 'Unauthorised', e);
      }
    });
  } else {
    ErrorHandler.response(res, 401, 'Unauthorised', null);
  }
};

export const getJwtToken = (info): string => {
  return jwt.sign(
    {
      ...info,
    },
    JWT_SECRET_TOKEN,
  );
};
