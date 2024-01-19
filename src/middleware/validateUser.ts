import { AuthorizationFailed } from '../helpers/AuthenticationException';
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET_TOKEN } from '../../config/token';
import { extractAuthToken } from '../helpers/session';
import User from '../../models/User';
import Users_Tokens from '../../models/Users_Tokens';
import User_Roles from '../../models/User_Roles';
import { ErrorHandler } from '../utils/handlers';

export const validateUser = async (req, res, next) => {
  const token = extractAuthToken(req);
  req.user = await validateToken(token).catch(() => {
    return ErrorHandler.response(res, 400, 'Invalid token', {});
  });
  req.decodedJwt = decodeToken(token);
  return next();
};

export const decodeToken = (token: string) => {
  return jwt.decode(token);
};

export const validateToken = (token: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET_TOKEN, async (err: any, decoded: any) => {
      if (err) {
        return reject(new Error('Session Expired. Please logout and re-login'));
      }
      const userToken = await Users_Tokens.findOne({
        where: { user_token: decoded.token },
      });
      if (!userToken) return reject(new AuthorizationFailed('Invalid user token. Please logout and re-login.'));
      const userDb = await User.findOne({ where: { user_id: userToken.user_id }, include: [User_Roles] });
      if (!userDb) return reject(new AuthorizationFailed('Invalid user token. Please logout and re-login.'));
      userDb.password = undefined;
      return resolve(userDb);
    });
  });
};
