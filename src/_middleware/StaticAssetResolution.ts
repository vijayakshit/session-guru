import express from 'express';
import { Express } from 'express';
import path from 'path';

const attatchStaticAssetResolutionMiddleware = (app: Express): Express => {
  app.use(express.static(path.join(process.cwd(), 'public')));
  return app;
};

export default attatchStaticAssetResolutionMiddleware;
