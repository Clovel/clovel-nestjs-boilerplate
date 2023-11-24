/* Framework imports ----------------------------------- */
import { Module } from '@nestjs/common';

/* Module imports -------------------------------------- */
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'modules/users/users.module';

/* Auth module ----------------------------------------- */
@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
    }),
  ],
  providers: [
    AuthService,
  ],
  controllers: [
    AuthController,
  ],
})

/* Export Auth module ---------------------------------- */
export class AuthModule {}
