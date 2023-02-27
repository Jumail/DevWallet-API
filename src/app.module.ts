import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { WalletModule } from './wallet/wallet.module';
import { CurrencyModule } from './currency/currency.module';
import { AccountModule } from './account/account.module';
import { TransactionModule } from './transaction/transaction.module';
import { AppealModule } from './appeal/appeal.module';
import { AddressModule } from './address/address.module';
import { CountryModule } from './country/country.module';
import { BusinessModule } from './business/business.module';
import { ProductModule } from './product/product.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    WalletModule,
    CurrencyModule,
    AccountModule,
    TransactionModule,
    AppealModule,
    AddressModule,
    CountryModule,
    BusinessModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
