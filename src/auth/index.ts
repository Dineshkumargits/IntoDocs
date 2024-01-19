import express from 'express';
import { Op } from 'sequelize';
import { USER_TOKEN_EXPIRATION_TIME } from '../../config/token';
import User from '../../models/User';
import Users_Tokens from '../../models/Users_Tokens';
import { comparePassword, getHashOfPassword } from '../helpers/passwordHelper';
import { validateToken, validateUser } from '../middleware/validateUser';
import { ErrorHandler, ResponseHandler } from '../utils/handlers';
const router: express.Router = express.Router();
router.post('/signup', async (req, res) => {
  if (!req.body.first_name || !req.body.last_name || !req.body.email || !req.body.password) {
    return ErrorHandler.response(res, 400, 'Bad input', {});
  }
  let user = await User.findOne({
    where: {
      email: { [Op.eq]: req.body.email },
    },
  });
  if (user) {
    return ErrorHandler.response(res, 400, 'Email already exists', {});
  }
  user = await User.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: getHashOfPassword(req.body.password),
    user_role_id: 2,
  });
  user.password = undefined;
  const token: string = await Users_Tokens.getNewUserToken(user, req, USER_TOKEN_EXPIRATION_TIME);
  ResponseHandler.response(res, 200, 'success', {
    token: token,
    user,
  });
});

router.post('/signin', async (req, res) => {
  let token: string;
  if (!req.body.email || !req.body.password) {
    return ErrorHandler.response(res, 400, 'Bad input', {});
  }
  let user = await User.findOne({
    where: {
      email: { [Op.eq]: req.body.email },
    },
  });
  if (user) {
    if (req.body.password.trim() === '') return ErrorHandler.response(res, 400, 'Password cannot be empty', {});
    if (comparePassword(req.body.password, user.password)) {
      token = await Users_Tokens.getNewUserToken(user, req, USER_TOKEN_EXPIRATION_TIME);
      await validateToken(token);
      user.password = undefined;
      return ResponseHandler.response(res, 200, 'success', {
        token: token,
        user,
      });
    } else {
      return ErrorHandler.response(res, 400, 'Invalid password', {});
    }
  } else {
    return ErrorHandler.response(res, 400, 'Invalid email', {});
  }
});

router.get('/getuser', validateUser, async (req, res) => {
  return ResponseHandler.response(res, 200, 'success', {
    authenticated: true,
    user: (req as any).user,
  });
});

module.exports = router;
