import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/user.service';
import { AddressService } from 'src/address/address.service';

@Module({
  controllers: [WalletController],
  providers: [WalletService, PrismaService, UserService, AddressService],
})
export class WalletModule {}
