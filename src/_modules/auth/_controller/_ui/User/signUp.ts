import { Page, UIParserConfig } from '../../../../../_types/core';

const signUp = {
  parser: (
    _requestBody: Record<any, any> = {},
    _reqParams: Record<any, any> = {},
    _queryParams: Record<any, any> = {},
    session: Record<any, any> = {}
  ): UIParserConfig => {
    const { sessionUser = {} } = session;
    return {
      currentPage: Page.SIGN_UP,
      email: sessionUser.email,
      isAuthenticated: !!sessionUser.email,
      isAuthenticationPage: true,
      role: sessionUser.role,
      pageConfig: {}
    };
  }
};
export default signUp;
