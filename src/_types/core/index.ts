import { Role, User } from '../../_entities/User';

////////////////////////////////////////// Routing Types
export interface RouterConfig {
  readonly subroute: string;
  readonly routeHttpType: RouteHttpType;
  readonly needsAuthentication?: boolean;
  readonly parser: (
    reqBody: any,
    reqParams: any,
    queryParams: any,
    session: any
  ) => any;
}

export interface APIRouterConfig extends RouterConfig {
  readonly isAuthenticationCall?: boolean;
  readonly controller: (requestObject: any) => Promise<any>;
}

export interface UIRouterConfig extends RouterConfig {
  readonly viewPath: string;
}

export enum RouteHttpType {
  POST = 'POST',
  PUT = 'PUT',
  GET = 'GET',
  DELETE = 'DELETE'
}

export enum RouteEndpointType {
  UI = 'UI',
  API = 'API'
}

////////////////////////////////////////// Generic Types

export interface ObjectLiteral {
  [key: string]: any;
}

////////////////////////////////////////

export interface SessionUser {
  id: string;
  email: string;
  role: Role;
}

////////////

export interface NavigationConfig {
  readonly currentPage: Page;
  readonly validLinks: ReadonlyArray<Page>;
  readonly email: string;
  readonly role: Role;
}

export enum Page {
  ABOUT = 'ABOUT',
  TEACHER = 'TEACHER',
  LEARNER = 'LEARNER',
  SIGN_IN = 'SIGN_IN',
  SIGN_UP = 'SIGN_UP'
}

//////////
export interface UIPageConfig {
  readonly navigationConfig: NavigationConfig;
  readonly pageConfig: ObjectLiteral;
}

export interface UIParserConfig {
  currentPage: Page;
  email: string;
  isAuthenticated: boolean;
  isAuthenticationPage: boolean;
  role: Role;
  pageConfig: ObjectLiteral;
}
