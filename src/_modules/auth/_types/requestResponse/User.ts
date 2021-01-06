import { ObjectLiteral } from '../../../../_types/core';
import { Role } from '../../../../_entities/User';
import { SignInErrorCode, SignUpErrorCode } from '../authErrorCodes/ErrorCodes';
import { SessionUser } from '../../../../_types/core/index';

export interface RegisterUserRequest extends ObjectLiteral {
  readonly email: string;
  readonly role: Role;
  readonly password: string;
}

export interface RegisterUserResponse extends ObjectLiteral {
  readonly success: boolean;
  readonly sessionUser?: SessionUser;
  readonly redirectionPath?: string;
  readonly errorCode?: SignUpErrorCode;
}

export interface LoginUserRequest extends ObjectLiteral {
  readonly email: string;
  readonly password: string;
}

export interface LoginUserResponse extends ObjectLiteral {
  readonly success: boolean;
  readonly sessionUser?: SessionUser;
  readonly redirectionPath?: string;
  readonly errorCode?: SignInErrorCode;
}

export interface LogoutUserRequest extends ObjectLiteral {
  readonly userId: string;
}

export interface LogoutUserResponse extends ObjectLiteral {
  readonly destroySession: boolean;
  readonly redirectionPath?: string;
}
