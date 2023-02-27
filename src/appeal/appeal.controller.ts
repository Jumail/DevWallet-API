import {
  Controller,
  Get,
  Delete,
  Post,
  Put,
  Param,
  Body,
} from '@nestjs/common';
import { Prisma, AppealStatus } from '@prisma/client';
import { AppealService } from './appeal.service';

@Controller('appeal')
export class AppealController {
  constructor(private readonly appealService: AppealService) {}

  @Get('/:id')
  async getAppeal(@Param('id') id: string) {
    return this.appealService.getAppeal({ id });
  }

  @Get('/')
  async getAllAppeals() {
    return this.appealService.getAllAppeals({});
  }

  @Post('/')
  async createAppeal(
    @Body()
    body: {
      message: string;
      status: AppealStatus;
      created_by: string;
      transaction_id: string;
    },
  ) {
    return this.appealService.createAppeal({
      message: body.message,
      status: body.status,
      created_by: { connect: { id: body.created_by } },
      transactions: { connect: { id: body.transaction_id } },
    });
  }

  @Put('/:id')
  async updateAppeal(
    @Param('id') id: string,
    @Body() body: Prisma.AppealUpdateInput,
  ) {
    return this.appealService.updateAppeal({ where: { id: id }, data: body });
  }

  @Delete('/:id')
  async deleteAppeal(@Param('id') id: string) {
    return this.appealService.deleteAppeal({ id });
  }
}
