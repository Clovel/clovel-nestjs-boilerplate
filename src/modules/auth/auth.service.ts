/* Framework imports ----------------------------------- */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

/* Module imports -------------------------------------- */
import { UsersService } from 'modules/users/users.service';

/* Type imports ---------------------------------------- */
import type {
  JwtPayload,
  SignInDTO,
} from './auth.types';

/* Internal variables ---------------------------------- */
const JWT_VALIDITY_DURATION: number = 7 * 24 * 60 * 60 * 1000; // 1 week
const JWT_REFRESH_VALIDITY_DURATION: number = 30 * 24 * 60 * 60 * 1000; // 1 week

/* Auth module service --------------------------------- */
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService
  ) {}

  async signIn(
    email: string,
    password: string,
  ): Promise<SignInDTO> {
    const user = await this.usersService.checkUserPassword({
      email: email,
      password: password,
    });

    const currentDate: Date = new Date();
    const accessTokenExpirationDate: Date = new Date(currentDate.getTime() + JWT_VALIDITY_DURATION);
    const refreshTokenExpirationDate: Date = new Date(currentDate.getTime() + JWT_REFRESH_VALIDITY_DURATION);
    const accessTokenPayload: JwtPayload = {
      type: 'access',
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      expiresAt: accessTokenExpirationDate,
    };
    const refreshTokenPayload: JwtPayload = {
      ...accessTokenPayload,
      type: 'refresh',
      expiresAt: refreshTokenExpirationDate,
    };

    if(
      process.env.JWT_SECRET === undefined ||
      process.env.JWT_SECRET === null ||
      process.env.JWT_SECRET.length < 1
    ) {
      throw new Error('JWT_SECRET is not set');
    }

    return {
      user: user,
      accessToken: await this.jwtService.signAsync(
        accessTokenPayload,
        {
          expiresIn: JWT_VALIDITY_DURATION,
          secret: process.env.JWT_SECRET,
        }
      ),
      refreshToken: await this.jwtService.signAsync(
        refreshTokenPayload,
        {
          expiresIn: JWT_REFRESH_VALIDITY_DURATION,
          secret: process.env.JWT_SECRET,
        }
      ),
    };
  }
}
