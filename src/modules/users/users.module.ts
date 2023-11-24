/* Framework imports ----------------------------------- */
import { Module } from '@nestjs/common';

/* Module imports -------------------------------------- */
import { PrismaService } from 'modules/prisma/prisma.service';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

/* Users module ---------------------------------------- */
@Module({
  providers: [
    PrismaService,
    UsersService,
  ],
  controllers: [
    UsersController,
  ],
  exports: [
    UsersService,
  ],
})

/* Export Users module --------------------------------- */
export class UsersModule {}
