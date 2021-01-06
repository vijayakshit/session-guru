import { Express } from 'express';
import { VIEW_ENGINE } from '../_config/constants';
import { VIEWS_CONFIG as aboutViewConfig } from '../_modules/about';
import { VIEWS_CONFIG as authViewConfig } from '../_modules/auth';
import { VIEWS_CONFIG as teacherViewConfig } from '../_modules/teacher';
import { VIEWS_CONFIG as learnerViewConfig } from '../_modules/learner';

const moduleViewConfigs: any[] = [
  aboutViewConfig,
  authViewConfig,
  teacherViewConfig,
  learnerViewConfig
];

const viewsPaths = moduleViewConfigs
  .filter((config) => config.hasViews)
  .map((config) => config.viewsPath);

const attatchViewsResolutionMiddleware = (app: Express): Express => {
  app.set('views', viewsPaths);
  app.set('view engine', VIEW_ENGINE);
  return app;
};

export default attatchViewsResolutionMiddleware;
