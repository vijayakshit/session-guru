import { Page, UIParserConfig } from '../../../../../_types/core';

const about = {
  parser: (
    _requestBody: Record<any, any> = {},
    _reqParams: Record<any, any> = {},
    _queryParams: Record<any, any> = {},
    session: Record<any, any> = {}
  ): UIParserConfig => {
    const { sessionUser = {} } = session;
    return {
      currentPage: Page.ABOUT,
      email: sessionUser.email,
      isAuthenticated: !!sessionUser.email,
      isAuthenticationPage: false,
      role: sessionUser.role,
      pageConfig: {}
    };
  }
};
export default about;
