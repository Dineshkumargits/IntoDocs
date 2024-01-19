import * as dotenv from 'dotenv';
// all init here
dotenv.config({ path: __dirname + '/../.env.local' });
dotenv.config();

import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';

import 'reflect-metadata';

import { ErrorHandler } from '../src/utils/handlers/';
import sequelize from './sequelize';
import '@package/error_handler-backend/src/error-handler';
import './env';

const app: express.Application = express();
/* eslint-disable */
const http = require('http');

// all middlewares here
app.use(cors());
app.use(
  helmet({
    contentSecurityPolicy: process.env.NODE_ENV == 'production' ? undefined : false,
  }),
);
app.use(bodyParser.json());

/* eslint-disable */
app.use('/', require('../src/index'));
app.get('/info', (req, res) => {
  return sequelize
    .authenticate()
    .then(() => {
      return res.status(200).send({
        message: 'DB Connection is live.',
        version: process.env.npm_package_version,
      });
    })
    .catch(() => {
      return res.status(400).send({
        message: 'DB Connection error',
      });
    });
});
app.get('/error', (req, res) => {
  ErrorHandler.response(res, 500, 'Internal Server Error', null);
});

// global error handler
app.use((err: any, req: Request, res: Response, next: any) => {
  console.log(err);
  if (err.code === 'LIMIT_FILE_SIZE') {
    return ErrorHandler.response(res, 403, 'File size is too large', null);
  }
  ErrorHandler.response(res, 500, 'Internal Server Error', null);
});
const httpServer = http.createServer(app);

export default app;
export { httpServer };
