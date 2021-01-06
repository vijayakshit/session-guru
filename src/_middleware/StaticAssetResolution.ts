import express from 'express';
import { Express } from 'express';
import path from 'path';

import { ROOT_PATH } from '../_config/constants';

const attatchStaticAssetResolutionMiddleware = (app: Express): Express => {
  app.use(express.static(path.join(ROOT_PATH, 'public')));
  return app;
};

export default attatchStaticAssetResolutionMiddleware;
