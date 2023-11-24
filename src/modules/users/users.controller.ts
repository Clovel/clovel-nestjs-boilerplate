/* Framework imports ----------------------------------- */
import {
  Controller,
  Body,
  Param,
  Get,
  Post,
  HttpException,
} from '@nestjs/common';

/* Module imports -------------------------------------- */
import { Prisma } from '@prisma/client';
import { UsersService } from './users.service';

/* Type imports ---------------------------------------- */
// import type { User as UserModel } from '@prisma/client';
import type { UserDTO } from './users.types';

/* User module controller ------------------------------ */
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async createUser(
    @Body() userData: Prisma.UserCreateInput,
  ): Promise<UserDTO> {
    return this.userService.createUser(userData);
  }

  @Get()
  async getUsers(): Promise<UserDTO[]> {
    return this.userService.users({});
  }

  @Get(':id')
  async getUser(
    @Param('id') id: string,
    @Body() userData: {
      id: number;
    },
  ): Promise<UserDTO> {
    const foundUser = await this.userService.user({
      id: userData.id,
    });

    if(!foundUser) {
      throw new HttpException('User not found', 404);
    }

    return foundUser;
  }

  @Post(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() userData: Prisma.UserUpdateInput,
  ): Promise<UserDTO> {
    const foundUser = await this.userService.user({
      id: id,
    });

    if(!foundUser) {
      throw new HttpException('User not found', 404);
    }

    return this.userService.updateUser({
      where: {
        id: id,
      },
      data: {
        email: userData.email,
        password: userData.password,
        firstName: userData.firstName,
        lastName: userData.lastName,
      },
    });
  }
}
