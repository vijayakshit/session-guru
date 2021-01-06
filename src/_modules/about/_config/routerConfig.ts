import { RouteHttpType } from '../../../_types/core';
import about from '../_controller/_ui/About/about';

const routingConfig = {
  API_ROUTING: [],
  UI_ROUTING: [
    {
      routeHttpType: RouteHttpType.GET,
      subroute: '/',
      needsAuthentication: false,
      parser: about.parser,
      viewPath: '_pages/about'
    }
  ]
};

export default routingConfig;
