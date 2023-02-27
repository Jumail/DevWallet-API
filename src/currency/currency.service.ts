import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CurrencyService {
  constructor(private readonly prisma: PrismaService) {}

  async currency(where: Prisma.CurrencyWhereUniqueInput) {
    return this.prisma.currency.findUnique({ where });
  }

  async currencies(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CurrencyWhereUniqueInput;
    where?: Prisma.CurrencyWhereInput;
    orderBy?: Prisma.CurrencyOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.currency.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createCurrency(params: {
    data: Prisma.CurrencyCreateInput;
    country: number;
  }) {
    return await this.prisma.currency.create({
      data: {
        country: { connect: { id: params.country } },
        name: params.data.name,
        symbol: params.data.symbol,
      },
    });
  }

  async updateCurrency(params: {
    where: Prisma.CurrencyWhereUniqueInput;
    data: Prisma.CurrencyUpdateInput;
  }) {
    const { where, data } = params;
    return this.prisma.currency.update({
      data,
      where,
    });
  }

  async deleteCurrency(where: Prisma.CurrencyWhereUniqueInput) {
    return this.prisma.currency.delete({ where });
  }
}
