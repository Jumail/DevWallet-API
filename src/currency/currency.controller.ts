import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Body,
  Patch,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CurrencyService } from './currency.service';

@Controller('currency')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Get('/')
  async getAllCurrencies() {
    return this.currencyService.currencies({});
  }

  @Get('/:id')
  async getCurrencyById(@Param('id') id: number) {
    return this.currencyService.currency({ id });
  }

  @Post('/')
  async createCurrency(
    @Body() body: { name: string; symbol: string; country: number },
  ) {
    return this.currencyService.createCurrency({
      data: {
        name: body.name,
        symbol: body.symbol,
      },
      country: body.country,
    });
  }

  @Patch('/:id')
  async updateCurrency(
    @Param('id') id: number,
    @Body() data: Prisma.CurrencyUpdateInput,
  ) {
    return this.currencyService.updateCurrency({
      where: { id },
      data,
    });
  }

  @Delete('/:id')
  async deleteCurrency(@Param('id') id: number) {
    return this.currencyService.deleteCurrency({ id });
  }
}
