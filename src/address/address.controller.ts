import {
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
  Body,
  Put,
} from '@nestjs/common';
import { AddressService } from './address.service';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get('/:id')
  async getAddress(@Param('id') id: string) {
    return this.addressService.getAddress({ id });
  }

  @Get('/')
  async getAllAddresses() {
    return this.addressService.getAllAddresses({});
  }

  @Post('/:user_id')
  async createAddress(
    @Param('user_id') user_id: string,
    @Body()
    body: {
      city: string;
      country: string;
      line1: string;
      line2: string;
      zip: string;
      state: string;
    },
  ) {
    return this.addressService.createAddress({
      city: body.city,
      country: { connect: { name: body.country } },
      line_1: body.line1,
      line_2: body.line2,
      zip: body.zip,
      state: body.state,
      user: { connect: { id: user_id } },
    });
  }

  @Put('/:id')
  async updateAddress(
    @Param('id') id: string,
    @Body()
    body: {
      city: string;
      country: string;
      line1: string;
      line2: string;
      zip: string;
      state: string;
    },
  ) {
    return this.addressService.updateAddress({
      where: { id },
      data: {
        city: body.city,
        country: { connect: { name: body.country } },
        line_1: body.line1,
        line_2: body.line2,
        zip: body.zip,
        state: body.state,
      },
    });
  }
}
