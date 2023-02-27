import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:id')
  async get_user_by_id(@Param('id') id: string) {
    return this.userService.user({ id });
  }

  @Post('/register')
  async register_user(
    @Body()
    user: {
      first_name: string;
      last_name: string;
      password: string;
      email: string;
      phone: string;
      country: string;
    },
  ) {
    return this.userService.createUser({
      data: {
        first_name: user.first_name,
        last_name: user.last_name,
        password: user.password,
        email: user.email,
        phone: user.phone,
      },
      country: user.country,
    });
  }

  @Get('/')
  async getAllUsers() {
    return this.userService.users({});
  }

  @Patch('/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() data: Prisma.UserUpdateInput,
  ) {
    return this.userService.updateUser({
      where: { id },
      data,
    });
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser({ id });
  }
}
