import express from 'express';
import multer from 'multer';
import { ResponseHandler } from './utils/handlers';
import { validateAdmin, validateUser } from './middleware/validateUser';
import User from '../models/User';
import { Op } from 'sequelize';
import RecentActivities from '../models/RecentActivities';

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
router.get('/get_recent_activities', validateUser, async (req, res) => {
  const user = (req as any).user;
  const ra = await RecentActivities.findAll({
    where: {
      user_id: user?.user_id,
    },
  });
  res.json([...ra]);
});

module.exports = router;
