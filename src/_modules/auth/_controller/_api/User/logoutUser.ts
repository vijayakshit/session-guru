import {
  LogoutUserRequest,
  LogoutUserResponse
} from '../../../_types/requestResponse/User';

//TODO: Implement
const logoutUser = {
  controller: async (
    _logoutUserRequest: LogoutUserRequest
  ): Promise<LogoutUserResponse> => {
    return {
      destroySession: true,
      redirectionPath: '/about/ui'
    };
  },
  parser: (
    _requestBody: Record<any, any> = {},
    _reqParams: Record<any, any> = {},
    _queryParams: Record<any, any> = {},
    _session: Record<any, any> = {}
  ): LogoutUserRequest => {
    return {
      userId: ''
    };
  }
};
export default logoutUser;
