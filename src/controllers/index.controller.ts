import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
  S3ClientConfig,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';

dotenv.config();

const REGION = process.env.REGION;
const ACCESS_KEY = process.env.AWS_ACCESS_KEY_ID;
const SECRET_KEY = process.env.AWS_SECRET_ACCESS_KEY;

// Render home page
export const getHome = (_req: Request, res: Response) => {
  res.render('pages/home/index');
};

// Get link for upload file to amazon s3
export const getSignedLinkS3 = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const fileName = req.query['file-name'];
  const fileType = req.query['file-type'];

  // Declade params
  const s3Params = {
    Bucket: process.env.S3_BUCKET,
    Key: fileName as any,
    ContentType: fileType as any,
    ACL: 'bucket-owner-full-control',
  };

  // Declade config
  const s3Configuration: S3ClientConfig = {
    credentials: {
      accessKeyId: ACCESS_KEY || '',
      secretAccessKey: SECRET_KEY || '',
    },
    region: REGION,
  };

  const s3 = new S3Client(s3Configuration);
  const command = new PutObjectCommand(s3Params);

  try {
    const signedUrl = await getSignedUrl(s3, command, { expiresIn: 15 * 60 });
    const returnData = {
      signedRequest: signedUrl,
      url: `https://${process.env.S3_BUCKET}.s3.amazonaws.com/${fileName}`,
    };

    res.json(returnData);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

// Get file in amazon s3 using file name
export const getFileS3 = async (req: Request, res: Response) => {
  const fileName = req.query['file-name'];
  const s3Configuration: S3ClientConfig = {
    credentials: {
      accessKeyId: ACCESS_KEY || '',
      secretAccessKey: SECRET_KEY || '',
    },
    region: REGION,
  };
  const s3 = new S3Client(s3Configuration);
  const command = new GetObjectCommand({
    Bucket: process.env.S3_BUCKET,
    Key: fileName as any,
  });
  const url = await getSignedUrl(s3, command, { expiresIn: 15 * 60 }); // expires in seconds
  res.json({ url });
};
