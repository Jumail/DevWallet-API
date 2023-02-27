import {
  Param,
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
} from '@nestjs/common';
import { BusinessService } from './business.service';

@Controller('business')
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  @Get('/:id')
  async getBusinessById(@Param('id') id: string) {
    return this.businessService.getBusiness({ id });
  }

  @Get('/')
  async getAllBusinesses() {
    return this.businessService.getAllBusinesses({});
  }

  @Post('/')
  async createBusiness(
    @Body()
    body: {
      name: string;
      bio: string;
      phone: string;
      email: string;
      city: string;
      line_1: string;
      line_2: string;
      zip: string;
      state: string;
      country: string;
    },
  ) {
    return this.businessService.createBusiness({
      name: body.name,
      bio: body.bio,
      phone: body.phone,
      email: body.email,
      country: {
        connect: {
          name: body.country,
        },
      },
      address: {
        create: {
          city: body.city,
          line_1: body.line_1,
          line_2: body.line_2,
          zip: body.zip,
          state: body.state,
          country: {
            connect: {
              name: body.country,
            },
          },
        },
      },
    });
  }

  @Patch('/:id')
  async updateBusiness(
    @Param('id') id: string,
    @Body()
    body: {
      name: string;
      bio: string;
      phone: string;
      email: string;
      city: string;
      line_1: string;
      line_2: string;
      zip: string;
      state: string;
      country: string;
    },
  ) {
    return this.businessService.updateBusiness({
      where: { id },
      data: {
        name: body.name,
        bio: body.bio,
        phone: body.phone,
        email: body.email,
        country: {
          connect: {
            name: body.country,
          },
        },
        address: {
          update: {
            city: body.city,
            line_1: body.line_1,
            line_2: body.line_2,
            zip: body.zip,
            state: body.state,
            country: {
              connect: {
                name: body.country,
              },
            },
          },
        },
      },
    });
  }

  @Delete('/:id')
  async deleteBusiness(@Param('id') id: string) {
    return this.businessService.deleteBusiness({ id });
  }
}
