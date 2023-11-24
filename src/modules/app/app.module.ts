/* Framework imports ----------------------------------- */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

/* Module imports -------------------------------------- */
import appConfig from 'modules/config/app.config';
import { AuthModule } from 'modules/auth/auth.module';
import { UsersModule } from 'modules/users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

/* App module ------------------------------------------ */
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        appConfig,
      ],
    }),
    AuthModule,
    UsersModule,
  ],
  providers: [
    AppService,
  ],
  controllers: [
    AppController,
  ],
})

/* Export App module ----------------------------------- */
export class AppModule {}
