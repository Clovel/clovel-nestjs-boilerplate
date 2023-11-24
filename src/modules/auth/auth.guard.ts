/* Framework imports ----------------------------------- */
import type {
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';
import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

/* Module imports -------------------------------------- */
import type {
  JwtPayload,
  RequestWithJwtPayload,
} from './auth.types';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  private extractTokenFromHeader(request: RequestWithJwtPayload): string | undefined {
    const [ type, token ] = request.headers.get('authorization')?.split(' ') ?? [];

    return type === 'Bearer' ?
      token :
      undefined;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: RequestWithJwtPayload = context
      .switchToHttp()
      .getRequest<RequestWithJwtPayload>();

    const token = this.extractTokenFromHeader(request);
    if(
      token === undefined ||
      token === null ||
      token.length < 1
    ) {
      throw new UnauthorizedException(`Missing auth token`);
    }

    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(
        token,
        {
          secret: process.env.JWT_SECRET,
        }
      );

      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request.jwtPayload = payload;
    } catch{
      throw new UnauthorizedException(`Invalid auth token`);
    }
    return true;
  }
}
