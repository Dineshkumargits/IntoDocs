import express from 'express';
import multer from 'multer';
import { ResponseHandler } from './utils/handlers';
import { validateAdmin } from './middleware/validateUser';
import User from '../models/User';
import { Op } from 'sequelize';

export const uploadinMem = multer({
  storage: multer.memoryStorage(),
  // limits: {
  //   fileSize: MAX_UPLOAD_FILESIZE,
  // },
});

const router: express.Router = express.Router();
/* eslint-disable */
router.get('/', (req, res) => {
  res.send('Ok');
});

router.get('/hello', (req, res) => {
  ResponseHandler.response(res, 200, 'Ok for Hello', null);
});
router.use('/auth', require('./auth/index'));
router.use('/documents', require('./documents/documents'));
router.use('/file', require('./fileupload/upload').default);
router.get('/get_all_clients', validateAdmin, async (req, res) => {
  const clients = await User.findAll({
    attributes: { exclude: ['password'] },
    where: {
      user_role_id: { [Op.ne]: 1 },
    },
  });
  return ResponseHandler.response(res, 200, 'success', clients);
});

module.exports = router;
