import { Controller, Get, Body, Param, Patch, Post } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CountryService } from './country.service';

@Controller('country')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get('/:id')
  async getCountry(@Param('id') id: number) {
    return this.countryService.getCountry({ id });
  }

  @Get('/')
  async getAllCountries() {
    return this.countryService.getAllCountries({});
  }

  @Post('/')
  async createCountry(@Body() data: Prisma.CountryCreateInput) {
    return this.countryService.createCountry(data);
  }

  @Patch('/:id')
  async updateCountry(
    @Param('id') id: number,
    @Body() data: Prisma.CountryUpdateInput,
  ) {
    return this.countryService.updateCountry({
      where: { id },
      data,
    });
  }

  @Post('/:id/delete')
  async deleteCountry(@Param('id') id: number) {
    return this.countryService.deleteCountry({ id });
  }
}
