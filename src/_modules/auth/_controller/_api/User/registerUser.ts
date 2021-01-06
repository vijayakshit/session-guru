import { createUser, getUserByEmail } from '../../../_model/User';
import {
  RegisterUserRequest,
  RegisterUserResponse
} from '../../../_types/requestResponse/User';
import { SignUpErrorCode } from '../../../_types/authErrorCodes/ErrorCodes';
import { Role } from '../../../../../_entities/User';

const registerUser = {
  controller: async (
    registerUserRequest: RegisterUserRequest
  ): Promise<RegisterUserResponse> => {
    const { email, role, password } = registerUserRequest;

    try {
      await createUser(email, password, role);
      const user = await getUserByEmail(email);
      return {
        success: true,
        sessionUser: {
          id: user.id,
          email: user.email,
          role: user.role
        },
        redirectionPath:
          user.role === Role.TEACHER
            ? '/teacher/ui/subjectListing'
            : user.role === Role.LEARNER
            ? '/teacher/ui/'
            : ''
      };
    } catch (err) {
      return {
        success: false,
        errorCode: SignUpErrorCode.SIGN_UP_USER_ALREADY_EXISTS
      };
    }
  },
  parser: (
    requestBody: Record<any, any> = {},
    _reqParams: Record<any, any> = {},
    _queryParams: Record<any, any> = {},
    _session: Record<any, any> = {}
  ): RegisterUserRequest => {
    const { email, role, password } = requestBody;
    return {
      email,
      role,
      password
    };
  }
};
export default registerUser;
