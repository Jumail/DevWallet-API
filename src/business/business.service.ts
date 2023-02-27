import { Injectable } from '@nestjs/common';
import { Prisma, Business } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class BusinessService {
  constructor(private readonly prismaService: PrismaService) {}

  async getBusiness(
    where: Prisma.BusinessWhereUniqueInput,
  ): Promise<Business | null> {
    return this.prismaService.business.findUnique({
      where,
    });
  }

  async getAllBusinesses(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.BusinessWhereUniqueInput;
    where?: Prisma.BusinessWhereInput;
    orderBy?: Prisma.BusinessOrderByWithRelationInput;
  }): Promise<Business[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prismaService.business.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createBusiness(data: Prisma.BusinessCreateInput): Promise<Business> {
    return this.prismaService.business.create({
      data,
    });
  }

  async updateBusiness(params: {
    where: Prisma.BusinessWhereUniqueInput;
    data: Prisma.BusinessUpdateInput;
  }): Promise<Business> {
    const { where, data } = params;
    return this.prismaService.business.update({
      data,
      where,
    });
  }

  async deleteBusiness(
    where: Prisma.BusinessWhereUniqueInput,
  ): Promise<Business> {
    return this.prismaService.business.delete({
      where,
    });
  }
}
