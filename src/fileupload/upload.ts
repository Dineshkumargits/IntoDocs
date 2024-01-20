import express from 'express';
import AWS, { S3 } from 'aws-sdk';
import {
  BUCKET_NAME,
  S3_ID,
  S3_SECRET,
  FILE_EXPIRATION_TIME,
  S3_REGION,
  S3_SIGNATURE,
  DEFAULT_MAX_FILESIZE,
  MAX_UPLOAD_FILESIZE,
} from './s3-bucket';
import multer from 'multer';
import { ErrorHandler, ResponseHandler } from '../utils/handlers';

export const renameFile = (name: string, altName: string = 'unknown_file') => {
  if (name) {
    return name.replace(/[`~!@#$%^&*()_|+\-=?;:'",<>\{\}\[\]\\\/ ]/gi, '_');
  }
  return altName;
};

export const uploadinMem = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: MAX_UPLOAD_FILESIZE,
  },
});

export const getRandomString = (length: number): string => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength: number = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const router: express.Router = express.Router();

const s3 = new AWS.S3({
  accessKeyId: S3_ID,
  secretAccessKey: S3_SECRET,
  signatureVersion: S3_SIGNATURE,
  region: S3_REGION,
});

router.post('/upload', uploadinMem.single('file'), async function (req, res) {
  uploadFileHelper(req, res);
});

const uploadFileHelper = async (req, res) => {
  const file = req.file;
  const newFileName = renameFile(file.originalname, 'Untitled');
  const fileName = 'nodejs/' + getRandomString(16) + '/' + newFileName;
  try {
    const { signedUrl, unsignedUrl } = await uploadFileToS3(file, fileName);
    return ResponseHandler.response(res, 200, 'File uploaded', {
      signedUrl,
      unsignedUrl,
    });
  } catch (error) {
    console.log('Error while uploading', error);
    return ErrorHandler.response(res, 400, 'Failed to upload file', null);
  }
};

export const getSignedUrl = (fileName: string): string => {
  let bucket_name = BUCKET_NAME;
  return `https://${bucket_name}.s3.amazonaws.com/${encodeURIComponent(fileName)}`;
};

export const uploadFileToS3 = (file, s3_file_key: string): Promise<{ signedUrl: string; unsignedUrl: string }> => {
  return new Promise((resolve, reject) => {
    const fileParams: S3.Types.PutObjectRequest = {
      Bucket: BUCKET_NAME,
      Key: s3_file_key,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'public-read',
    };
    try {
      s3.upload(fileParams, function (err: any) {
        if (err) {
          console.log(err);
          reject('Failed to upload file');
          return;
        } else {
          const signedUrl = getSignedUrl(s3_file_key);
          const unsignedUrl = s3_file_key;
          resolve({
            signedUrl,
            unsignedUrl,
          });
        }
      });
    } catch (error) {
      console.log('Error while uploading', error);
      reject('Failed to upload file');
    }
  });
};

export const deleteS3Object = async (key) => {
  return new Promise((resolve, reject) => {
    try {
      var params = { Bucket: BUCKET_NAME, Key: key };
      s3.deleteObject(params, function (err, data) {
        if (err) reject(err);
        // an error occurred
        else resolve(data); // successful response
      });
    } catch (e) {
      reject(e);
    }
  });
};

export default router;
export { DEFAULT_MAX_FILESIZE, MAX_UPLOAD_FILESIZE };
