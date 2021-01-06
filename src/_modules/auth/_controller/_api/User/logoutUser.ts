import { DEFAULT_REDIRECTION_PATH } from '../../../../../_config/constants';

import {
  LogoutUserRequest,
  LogoutUserResponse
} from '../../../_types/requestResponse/User';

const logoutUser = {
  controller: async (
    _logoutUserRequest: LogoutUserRequest
  ): Promise<LogoutUserResponse> => {
    return {
      destroySession: true,
      redirectionPath: DEFAULT_REDIRECTION_PATH
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
