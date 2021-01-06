import { RouteHttpType } from '../../../_types/core';
import registerUser from '../_controller/_api/User/registerUser';
import loginUser from '../_controller/_api/User/loginUser';
import logoutUser from '../_controller/_api/User/logoutUser';
import signIn from '../_controller/_ui/User/signIn';
import signUp from '../_controller/_ui/User/signUp';

const routingConfig = {
  API_ROUTING: [
    {
      routeHttpType: RouteHttpType.POST,
      subroute: '/loginUser',
      needsAuthentication: false,
      isAuthenticationCall: true,
      controller: loginUser.controller,
      parser: loginUser.parser
    },
    {
      routeHttpType: RouteHttpType.POST,
      subroute: '/registerUser',
      needsAuthentication: false,
      isAuthenticationCall: true,
      controller: registerUser.controller,
      parser: registerUser.parser
    },
    {
      routeHttpType: RouteHttpType.GET,
      subroute: '/logoutUser',
      needsAuthentication: true,
      isAuthenticationCall: true,
      controller: logoutUser.controller,
      parser: logoutUser.parser
    }
  ],
  UI_ROUTING: [
    {
      routeHttpType: RouteHttpType.GET,
      subroute: '/signIn',
      needsAuthentication: false,
      parser: signIn.parser,
      viewPath: '_pages/auth_sign_in'
    },
    {
      routeHttpType: RouteHttpType.GET,
      subroute: '/signUp',
      needsAuthentication: false,
      parser: signUp.parser,
      viewPath: '_pages/auth_sign_up'
    }
  ]
};

export default routingConfig;
