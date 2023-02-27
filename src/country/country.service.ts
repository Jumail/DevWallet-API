import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CountryService {
  constructor(private prismaService: PrismaService) {}

  async getCountry(where: Prisma.CountryWhereUniqueInput) {
    return this.prismaService.country.findUnique({ where });
  }

  async getAllCountries(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CountryWhereUniqueInput;
    where?: Prisma.CountryWhereInput;
    orderBy?: Prisma.CountryOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prismaService.country.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createCountry(data: Prisma.CountryCreateInput) {
    return this.prismaService.country.create({ data });
  }

  async updateCountry(params: {
    where: Prisma.CountryWhereUniqueInput;
    data: Prisma.CountryUpdateInput;
  }) {
    const { where, data } = params;
    return this.prismaService.country.update({
      data,
      where,
    });
  }

  async deleteCountry(where: Prisma.CountryWhereUniqueInput) {
    return this.prismaService.country.delete({ where });
  }
}
