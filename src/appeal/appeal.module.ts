import { Module } from '@nestjs/common';
import { AppealService } from './appeal.service';
import { AppealController } from './appeal.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [AppealController],
  providers: [AppealService, PrismaService],
})
export class AppealModule {}
