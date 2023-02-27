import { Injectable } from '@nestjs/common';
import { Prisma, Wallet } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/user.service';
import stripe from 'src/utils/stripe';

@Injectable()
export class WalletService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
  ) {}

  async wallet(
    WalletWhereUniqueInput: Prisma.WalletWhereUniqueInput,
  ): Promise<Wallet | null> {
    return this.prisma.wallet.findUnique({
      where: WalletWhereUniqueInput,
    });
  }

  async wallets(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.WalletWhereUniqueInput;
    where?: Prisma.WalletWhereInput;
    orderBy?: Prisma.WalletOrderByWithRelationInput;
  }): Promise<Wallet[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.wallet.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createWallet(params: {
    data: Prisma.WalletCreateInput;
    user_id: string;
  }): Promise<Wallet> {
    // Get user details from the database
    const user_result = await this.userService.user({ id: params.user_id });

    // Check if the user already is a stripe customer
    const stripe_customer = await stripe.customers.list({
      email: user_result.email,
    });

    if (stripe_customer.data.length > 0) {
      throw new Error('User is already registered as a stripe customer');
    }

    // Create a user on stripe
    const stripe_result = await stripe.customers.create({
      email: user_result.email,
      name: user_result.first_name + ' ' + user_result.last_name,
      description: 'First customer created on nestjs',
    });

    // Create a wallet on the database
    const wallet_result = await this.prisma.wallet.create({
      data: {
        user: { connect: { id: params.user_id } },
        stripe_customer_id: stripe_result.id,
      },
    });

    return wallet_result;
  }

  async updateWallet(params: {
    where: Prisma.WalletWhereUniqueInput;
    data: Prisma.WalletUpdateInput;
  }): Promise<Wallet> {
    const { where, data } = params;
    return this.prisma.wallet.update({
      data,
      where,
    });
  }

  async deleteWallet(where: Prisma.WalletWhereUniqueInput): Promise<Wallet> {
    return this.prisma.wallet.delete({
      where,
    });
  }
}
