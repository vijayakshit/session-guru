import { getUserByEmail } from '../../../_model/User';
import { SignInErrorCode } from '../../../_types/authErrorCodes/ErrorCodes';
import { doesPasswordMatchHash } from '../../../../../_utils/authenticationUtils';
import {
  LoginUserRequest,
  LoginUserResponse
} from '../../../_types/requestResponse/User';
import { Role } from '../../../../../_entities/User';

const loginUser = {
  controller: async (
    loginUserRequest: LoginUserRequest
  ): Promise<LoginUserResponse> => {
    const { email, password } = loginUserRequest;
    let user;
    try {
      user = await getUserByEmail(email);
    } catch (err) {
      return {
        success: false,
        errorCode: SignInErrorCode.SIGN_IN_USER_NOT_FOUND
      };
    }

    if (doesPasswordMatchHash(password, user.passhash)) {
      return {
        success: true,
        sessionUser: {
          email,
          id: user.id,
          role: user.role
        },
        redirectionPath:
          user.role === Role.TEACHER
            ? '/teacher/ui/subjectListing'
            : user.role === Role.LEARNER
            ? '/learner/ui/'
            : ''
      };
    } else {
      return {
        success: false,
        errorCode: SignInErrorCode.SIGN_IN_INCORRECT_PASSWORD
      };
    }
  },
  parser: (
    requestBody: Record<any, any> = {},
    _reqParams: Record<any, any> = {},
    _queryParams: Record<any, any> = {},
    _session: Record<any, any> = {}
  ): LoginUserRequest => {
    const { email, role, password } = requestBody;
    return {
      email,
      role,
      password
    };
  }
};
export default loginUser;
