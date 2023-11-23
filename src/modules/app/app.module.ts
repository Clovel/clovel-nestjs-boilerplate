/* Framework imports ----------------------------------- */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

/* Module imports -------------------------------------- */
import { AppController } from './app.controller';
import { AppService } from './app.service';
import appConfig from 'modules/config/app.config';

/* App module ------------------------------------------ */
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        appConfig,
      ],
    }),
  ],
  controllers: [
    AppController,
  ],
  providers: [
    AppService,
  ],
})

/* Export App module ----------------------------------- */
export class AppModule {}
