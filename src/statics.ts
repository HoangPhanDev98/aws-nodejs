import express, { Express } from 'express';
import path from 'path';

export default (app: Express) => {
  // CSS
  app.use(
    '/assets/css/bootstrap-icons',
    express.static(path.join(__dirname, '../node_modules/bootstrap-icons')),
  );

  // JS
  app.use(
    '/assets/js/bootstrap',
    express.static(path.join(__dirname, '../node_modules/bootstrap/dist/js')),
  );
  app.use(
    '/vendor/jquery',
    express.static(path.join(__dirname, '../node_modules/jquery/dist')),
  );
  app.use(
    '/vendor/axios',
    express.static(path.join(__dirname, '../node_modules/axios/dist')),
  );
  app.use(
    '/vendor/moment',
    express.static(path.join(__dirname, '../node_modules/moment/min')),
  );
};
