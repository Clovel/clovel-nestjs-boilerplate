/* Framework imports ----------------------------------- */
import type { OnModuleInit } from '@nestjs/common';
import { Injectable } from '@nestjs/common';

/* Module imports -------------------------------------- */
import { PrismaClient } from '@prisma/client';

/* Prisma module service ------------------------------- */
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit(): Promise<void> {
    await this.$connect();
  }
}
