import { Page, UIParserConfig } from '../../../../../_types/core';

const subjectDetails = {
  parser: (
    _requestBody: Record<any, any> = {},
    reqParams: Record<any, any> = {},
    _queryParams: Record<any, any> = {},
    session: Record<any, any> = {}
  ): UIParserConfig => {
    const { sessionUser = {} } = session;
    const { subjectId } = reqParams;
    return {
      currentPage: Page.TEACHER,
      email: sessionUser.email,
      isAuthenticated: !!sessionUser.email,
      isAuthenticationPage: false,
      role: sessionUser.role,
      pageConfig: {
        subjectId: subjectId
      }
    };
  }
};
export default subjectDetails;
