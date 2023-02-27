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
import { AccountService } from './account.service';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get('/:id')
  async getAccount(@Param('id') id: string) {
    return this.accountService.getAccount({ id });
  }

  @Get('/')
  async getAllAccounts() {
    return this.accountService.getAllAccounts({});
  }

  @Post('/')
  async createAccount(
    @Body() body: { name: string; currency: number; wallet: string },
  ) {
    return this.accountService.createAccount({
      name: body.name,
      currency: { connect: { id: body.currency } },
      wallet: { connect: { id: body.wallet } },
    });
  }

  @Patch('/:id')
  async updateAccount(
    @Param('id') id: string,
    @Body() data: Prisma.AccountUpdateInput,
  ) {
    return this.accountService.updateAccount({
      where: { id },
      data,
    });
  }

  @Delete('/:id')
  async deleteAccount(@Param('id') id: string) {
    return this.accountService.deleteAccount({ id });
  }
}
