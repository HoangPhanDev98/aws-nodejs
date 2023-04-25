import { Router } from 'express';

import * as indexController from '../controllers/index.controller';

export const indexRouter = Router();

indexRouter.get('/', indexController.getHome);
indexRouter.get('/sign-s3', indexController.getSignedLinkS3);
indexRouter.get('/get-file', indexController.getFileS3);
