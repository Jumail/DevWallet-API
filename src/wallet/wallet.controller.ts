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
import { WalletService } from './wallet.service';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Get('/:id')
  async get_wallet_by_id(@Param('id') id: string) {
    return this.walletService.wallet({ id });
  }

  @Get('/')
  async get_all_wallets() {
    return this.walletService.wallets({});
  }

  @Post('/:user_id')
  async create_wallet(
    @Body() wallet: Prisma.WalletCreateInput,
    @Param('user_id') user_id: string,
  ) {
    console.log(wallet);
    return this.walletService.createWallet({
      data: wallet,
      user_id: user_id,
    });
  }

  @Patch('/:id')
  async update_wallet(
    @Param('id') id: string,
    @Body() wallet: Prisma.WalletUpdateInput,
  ) {
    return this.walletService.updateWallet({
      where: { id },
      data: wallet,
    });
  }

  @Delete('/:id')
  async delete_wallet(@Param('id') id: string) {
    return this.walletService.deleteWallet({ id });
  }
}
