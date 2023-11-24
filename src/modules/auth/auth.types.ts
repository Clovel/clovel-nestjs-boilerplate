/* Type imports ---------------------------------------- */
import type { UserDTO } from 'modules/users/users.types';

/* Auth module type declarations ----------------------- */
export interface SignInArgs {
  email: string;
  password: string;
}

export type JwtPayload = Pick<
  UserDTO,
  'id' |
  'firstName' |
  'lastName' |
  'email'
> & {
  type: 'access' | 'refresh';
  expiresAt?: Date;
};

export interface SignInDTO {
  user: UserDTO;
  accessToken: string;
  refreshToken: string;
}

export interface RequestWithJwtPayload extends Request {
  jwtPayload: JwtPayload;
}
