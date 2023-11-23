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
import { UserService } from './user.service';

/* Type imports ---------------------------------------- */
import type { User as UserModel } from '@prisma/client';

/* User module controller ------------------------------ */
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('user')
  async signupUser(
    @Body() userData: {
      email: string;
      password: string;
      firstName?: string;
      lastName?: string;
    },
  ): Promise<UserModel> {
    return this.userService.createUser(userData);
  }

  @Get('user')
  async getUsers(): Promise<UserModel[]> {
    return this.userService.users({});
  }

  @Get('user/:id')
  async getUser(
    @Param('id') id: string,
    @Body() userData: {
      id: number;
    },
  ): Promise<UserModel> {
    const foundUser = await this.userService.user({
      id: userData.id,
    });

    if(!foundUser) {
      throw new HttpException('User not found', 404);
    }

    return foundUser;
  }

  @Post('user/login')
  async loginUser(
    @Body() userData: {
      email: string;
      password: string;
    },
  ): Promise<UserModel> {
    const foundUser = await this.userService.user({
      email: userData.email,
    });

    if(!foundUser) {
      throw new HttpException('User not found', 404);
    }

    if(foundUser.password !== userData.password) {
      throw new HttpException('Incorrect password', 401);
    }

    return foundUser;
  }

  @Post('user/logout')
  async logoutUser(
    @Body() userData: {
      id: number;
    },
  ): Promise<UserModel> {
    const foundUser = await this.userService.user({
      id: userData.id,
    });

    if(!foundUser) {
      throw new HttpException('User not found', 404);
    }

    return foundUser;
  }

  @Post('user/:id')
  async updateUser(
    @Param('id') id: number,
    @Body() userData: Prisma.UserUpdateInput,
  ): Promise<UserModel> {
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
