import { S3 } from '@aws-sdk/client-s3';
import aws from 'aws-sdk';
import dotenv from 'dotenv';

dotenv.config();

const REGION = process.env.REGION;
const ACCESS_KEY = process.env.AWS_ACCESS_KEY;
const SECRET_KEY = process.env.AWS_SECRET_KEY;
const SIGNATURE_VERSION = process.env.SIGNATURE_VERSION;

aws.config.update({
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_KEY,
  region: REGION,
  signatureVersion: SIGNATURE_VERSION,
});

const s3 = new S3({
  region: REGION,
});

const params: any = {
  Bucket: process.env.S3_BUCKET,
};

const editBucketCORS = () =>
  s3.putBucketCors(
    {
      Bucket: process.env.S3_BUCKET as string,
      CORSConfiguration: {
        CORSRules: [
          {
            AllowedHeaders: ['*'],
            AllowedMethods: ['PUT', 'POST', 'DELETE'],
            AllowedOrigins: ['*'],
          },
          {
            AllowedMethods: ['GET'],
            AllowedOrigins: ['*'],
          },
        ],
      },
    },
    (err) => {
      if (err) console.log(err, err.stack);
      else console.log(`Edit Bucket CORS succeed!`);
    },
  );

s3.createBucket(params, (err: { stack: any }, data: any) => {
  if (err) console.log(err, err.stack);
  else {
    console.log(data);
    editBucketCORS();
  }
});
