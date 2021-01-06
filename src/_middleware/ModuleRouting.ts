import { Express } from 'express';

import { DEFAULT_REDIRECTION_PATH } from '../_config/constants';

import { ROUTER_CONFIG as AboutRouting } from '../_modules/about';
import { ROUTER_CONFIG as AuthRouting } from '../_modules/auth';
import { ROUTER_CONFIG as TeacherRouting } from '../_modules/teacher';
import { ROUTER_CONFIG as LearnerRouting } from '../_modules/learner';

const moduleRouterConfig: any[] = [
  AboutRouting,
  AuthRouting,
  TeacherRouting,
  LearnerRouting
];

const attatchModuleRoutingMiddleware = (app: Express): Express => {
  moduleRouterConfig.forEach((moduleRouterConfig) => {
    app.use(
      `/${moduleRouterConfig.ROUTE_NAME}/`,
      moduleRouterConfig.MODULE_ROUTER
    );
  });

  app.use(function (req, res) {
    console.log('Unhandled Route. Redirecting', req.url);
    res.redirect(DEFAULT_REDIRECTION_PATH);
  });

  return app;
};

export default attatchModuleRoutingMiddleware;
