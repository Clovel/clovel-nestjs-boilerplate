/* Framework imports ----------------------------------- */
import { NestFactory } from '@nestjs/core';
import { getPortFromEnv } from 'helpers/getEnv';

/* Module imports -------------------------------------- */
import { AppModule } from 'modules/app/app.module';

/* Bootstrap the application --------------------------- */
const bootstrap = async (): Promise<void> => {
  const app = await NestFactory.create(AppModule);
  await app.listen(getPortFromEnv(8080));

  console.log(`[INIT ] Application is running on : ${await app.getUrl()}`);
};

bootstrap()
  .catch(console.error);
