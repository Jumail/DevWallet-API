import { Module } from '@nestjs/common';
import { BusinessService } from './business.service';
import { BusinessController } from './business.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [BusinessController],
  providers: [BusinessService, PrismaService],
})
export class BusinessModule {}
