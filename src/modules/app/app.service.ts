/* Framework imports ----------------------------------- */
import { Injectable } from '@nestjs/common';

/* App module service ---------------------------------- */
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
