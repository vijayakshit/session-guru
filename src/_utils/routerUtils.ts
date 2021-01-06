import express, { Router } from 'express';

import {
  APIRouterConfig,
  UIRouterConfig,
  RouteHttpType,
  ObjectLiteral,
  Page,
  UIPageConfig
} from '../_types/core';
import { Role } from '../_entities/User';

//TODO: Move all redirection logic to a middleware of its own
const authenticationMiddlewares: never[] = [];

const genericTemplateVariableResolver = (
  currentPage: Page,
  email: string,
  isAuthenticated: boolean,
  role: Role,
  pageConfig: ObjectLiteral
): UIPageConfig => {
  const validLinks = [Page.ABOUT];

  if (isAuthenticated) {
    role === Role.TEACHER && validLinks.push(Page.TEACHER);
    role === Role.LEARNER && validLinks.push(Page.TEACHER);
  } else {
    validLinks.push(Page.SIGN_IN, Page.SIGN_UP);
  }
  return {
    navigationConfig: {
      currentPage,
      email,
      validLinks,
      role
    },
    pageConfig: {
      ...pageConfig
    }
  };
};

const setupRoute = (
  router: Router,
  type: RouteHttpType,
  subroute: string,
  handler: any
) => {
  switch (type) {
    case RouteHttpType.POST:
      router.post(subroute, handler);
      break;
    case RouteHttpType.GET:
      router.get(subroute, handler);
      break;
    case RouteHttpType.PUT:
      router.put(subroute, handler);
      break;
    case RouteHttpType.DELETE:
      router.delete(subroute, handler);
      break;
  }
  return router;
};

const getUIHandler = (routeConfig: UIRouterConfig) => {
  const { viewPath, parser, needsAuthentication } = routeConfig;
  const handler = async (req: express.Request, res: express.Response) => {
    console.log(`Got Request on route ${req.originalUrl}`);
    console.log(req.session);
    try {
      const {
        currentPage,
        email,
        isAuthenticated,
        isAuthenticationPage,
        role,
        pageConfig
      } = parser(req.body, req.params, req.query, req.session);
      console.log(
        'IN UI HANdler',
        needsAuthentication,
        isAuthenticationPage,
        isAuthenticated
      );
      if (needsAuthentication && !isAuthenticationPage && !isAuthenticated) {
        res.redirect('/auth/ui/signIn');
      } else if (isAuthenticationPage && isAuthenticated) {
        const redirectionPath =
          req.session.sessionUser &&
          req.session.sessionUser.role === Role.TEACHER
            ? '/teacher/ui/subjectListing'
            : '/learner/ui/subjectListing:';
        res.redirect(redirectionPath);
      } else {
        res.render(
          viewPath,
          await genericTemplateVariableResolver(
            currentPage,
            email,
            isAuthenticated,
            role,
            pageConfig
          )
        );
      }
    } catch (err) {
      console.log(`Error Response With Error ${err.stack || err}`);
      res.status(500).json({ error: err });
    }
  };
  return handler;
};

const getAPIHandler = (routeConfig: APIRouterConfig) => {
  const {
    controller,
    parser,
    isAuthenticationCall,
    needsAuthentication
  } = routeConfig;
  const handler = async (req: express.Request, res: express.Response) => {
    console.log(
      `Got Request on route ${req.originalUrl} with body ${req.body}`
    );
    console.log(req.body);
    console.log(req.session);
    try {
      if (
        (!req.session ||
          !req.session.sessionUser ||
          !req.session.sessionUser.email) &&
        needsAuthentication
      ) {
        res.status(401).json({ redirectionPath: '/auth/ui/signIn' });
        return;
      }

      const result = await controller(
        parser(req.body, req.params, req.query, req.session)
      );

      //TODO: Move Authentication logic to Middleware
      if (isAuthenticationCall) {
        if (result.errorCode) {
          console.log(`Auth Unsuccessful ${JSON.stringify(result)}`);
          res.status(401).json(result);
        } else {
          console.log(`Auth Successful ${JSON.stringify(result)}`);

          req.session.sessionUser = result.sessionUser;

          if (result.destroySession) {
            req.session.destroy(() => {
              res.redirect(result.redirectionPath);
            });
          } else {
            res.status(200).json({ redirectionPath: result.redirectionPath });
          }
        }
      } else {
        console.log(`Success Response ${JSON.stringify(result)}`);
        res.status(200).json(result);
      }
    } catch (err) {
      console.log(`Error Response With Error ${err.stack || err}`);
      res.status(500).json({ error: err });
    }
  };
  return handler;
};

export const createRouter = (
  uiRoutesConfig: ReadonlyArray<UIRouterConfig>,
  apiRoutesConfig: ReadonlyArray<APIRouterConfig>
): express.Router => {
  const router = express.Router();

  uiRoutesConfig.forEach((uiRouteConfig: UIRouterConfig) => {
    const { routeHttpType, subroute } = uiRouteConfig;

    setupRoute(
      router,
      routeHttpType,
      '/ui' + subroute,
      getUIHandler(uiRouteConfig)
    );
  });

  apiRoutesConfig.forEach((apiRouteConfig: APIRouterConfig) => {
    const {
      routeHttpType,
      subroute
      //needsAuthentication,
    } = apiRouteConfig;

    setupRoute(
      router,
      routeHttpType,
      '/api' + subroute,
      getAPIHandler(apiRouteConfig)
    );
  });

  return router;
};
