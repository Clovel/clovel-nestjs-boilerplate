/* Framework imports ----------------------------------- */
import {
  Controller,
  Get,
} from '@nestjs/common';

/* Module imports -------------------------------------- */
import { AppService } from './app.service';

/* App module controller ------------------------------- */
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
