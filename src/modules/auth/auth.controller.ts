/* Framework imports ----------------------------------- */
import {
  Controller,
  Body,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
  Get,
} from '@nestjs/common';

/* Module imports -------------------------------------- */
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

/* Type imports ---------------------------------------- */
import { SignInArgs } from './auth.types';
import type { SignInDTO } from './auth.types';

/* Auth module controller ------------------------------ */
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  signIn(
    @Body() params: SignInArgs
  ): Promise<SignInDTO> {
    return this.authService.signIn(
      params.email,
      params.password
    );
  }

  @UseGuards(AuthGuard)
  @Get('test-guard')
  testGuard(): { message: string } {
    return {
      message: 'You are authorized',
    };
  }
}
