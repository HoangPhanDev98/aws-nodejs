import 'reflect-metadata';

import * as dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';
import express from 'express';
import expressLayouts from 'express-ejs-layouts';
import path from 'path';

import { indexRouter } from './routes/index.routes';
import wrapStatics from './statics';

(async () => {
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(cors());
  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, '../views'));
  app.use(expressLayouts);
  app.set('layout extractScripts', true);
  app.set('layout extractStyles', true);
  app.set('layout extractMetas', true);
  //default layout
  app.set('layout', 'layouts/layout');

  app.use(express.json({ limit: '50MB' }));
  app.use(express.urlencoded({ extended: true, limit: '50MB' }));
  app.use(express.static(`${__dirname}/../public`));

  wrapStatics(app);

  app.use('/', indexRouter);

  app.listen(PORT, () => {
    console.log(`App running on port http://localhost:${PORT}`);
  });
})();
