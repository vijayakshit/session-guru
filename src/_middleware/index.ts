import attatchSessionManagementMiddleware from './Sessions';
import attatchModuleRoutingMiddleware from './ModuleRouting';
import attatchStaticAssetResolutionMiddleware from './StaticAssetResolution';
import attatchViewsResolutionMiddleware from './ViewsResolution';
import attatchBodyParserMiddleware from './BodyParsers';
import { Express } from 'express';

//TODO: Caveat Order of middlewares could be a problem.
const middlewareAttatchers = [
  attatchSessionManagementMiddleware,
  attatchStaticAssetResolutionMiddleware,
  attatchViewsResolutionMiddleware,
  attatchBodyParserMiddleware,
  attatchModuleRoutingMiddleware
];

const attatchAllMiddleWares = (app: Express): Express => {
  middlewareAttatchers.forEach((attatcher) => attatcher(app));
  return app;
};

export default attatchAllMiddleWares;
