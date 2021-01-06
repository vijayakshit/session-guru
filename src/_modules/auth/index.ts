//TODO:  PROVIDE UNIQUE PATHS TO UI VIEW NAMES ; ALSO Figure a good way to avoid route and view name
import path from 'path';

import { createRouter } from '../../_utils/routerUtils';
import routingConfig from './_config/routerConfig';

export const MODULE_NAME = 'auth';

const router = createRouter(
  routingConfig.UI_ROUTING,
  routingConfig.API_ROUTING
);

export const VIEWS_CONFIG = {
  hasViews: true,
  viewsPath: path.join(__dirname, '_views')
};

export const ROUTER_CONFIG = {
  ROUTE_NAME: MODULE_NAME,
  MODULE_ROUTER: router
};
