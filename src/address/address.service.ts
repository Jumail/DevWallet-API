import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AddressService {
  constructor(private prismaService: PrismaService) {}

  async getAddress(where: Prisma.AddressWhereUniqueInput) {
    return this.prismaService.address.findUnique({
      where,
    });
  }

  async getAllAddresses(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.AddressWhereUniqueInput;
    where?: Prisma.AddressWhereInput;
    orderBy?: Prisma.AddressOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prismaService.address.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createAddress(data: Prisma.AddressCreateInput) {
    return this.prismaService.address.create({
      data,
    });
  }

  async updateAddress(params: {
    where: Prisma.AddressWhereUniqueInput;
    data: Prisma.AddressUpdateInput;
  }) {
    const { where, data } = params;
    return this.prismaService.address.update({
      data,
      where,
    });
  }

  async deleteAddress(where: Prisma.AddressWhereUniqueInput) {
    return this.prismaService.address.delete({
      where,
    });
  }
}
