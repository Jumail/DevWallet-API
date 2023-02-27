import { Injectable } from '@nestjs/common';
import { Prisma, Appeal } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AppealService {
  constructor(private readonly prisma: PrismaService) {}

  async getAppeal(
    where: Prisma.AppealWhereUniqueInput,
  ): Promise<Appeal | null> {
    return this.prisma.appeal.findUnique({ where });
  }

  async getAllAppeals(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.AppealWhereUniqueInput;
    where?: Prisma.AppealWhereInput;
    orderBy?: Prisma.AppealOrderByWithRelationInput;
  }): Promise<Appeal[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.appeal.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createAppeal(data: Prisma.AppealCreateInput): Promise<Appeal> {
    return this.prisma.appeal.create({
      data,
    });
  }

  async updateAppeal(params: {
    where: Prisma.AppealWhereUniqueInput;
    data: Prisma.AppealUpdateInput;
  }): Promise<Appeal> {
    const { where, data } = params;
    return this.prisma.appeal.update({ data, where });
  }

  async deleteAppeal(where: Prisma.AppealWhereUniqueInput): Promise<Appeal> {
    return this.prisma.appeal.delete({ where });
  }
}
