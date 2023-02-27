import { Injectable } from '@nestjs/common';
import { Prisma, Transaction } from '@prisma/client';
import { AccountService } from 'src/account/account.service';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TransactionService {
  constructor(
    private prismaService: PrismaService,
    private accountService: AccountService,
  ) {}

  async getTransactionById(
    where: Prisma.TransactionWhereUniqueInput,
  ): Promise<Transaction | null> {
    return this.prismaService.transaction.findUnique({
      where,
    });
  }

  async getAllTransactions(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.TransactionWhereUniqueInput;
    where?: Prisma.TransactionWhereInput;
    orderBy?: Prisma.TransactionOrderByWithRelationInput;
  }): Promise<Transaction[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prismaService.transaction.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createTransaction(
    data: Prisma.TransactionCreateInput,
    sender_account_id: string,
  ): Promise<Transaction> {
    // Check if the sender account has enough balance
    const senderAccount = await this.accountService.getAccount({
      id: sender_account_id,
    });

    if (senderAccount.balance < data.amount) {
      throw new Error('Insufficient balance');
    }

    // Charge the sender account
    await this.accountService
      .updateAccount({
        where: { id: sender_account_id },
        data: {
          balance: {
            decrement: data.amount,
          },
        },
      })
      .catch((err) => {
        console.log('Error: ', err);
        throw new Error('Unable to charge sender account');
      });

    // Credit the receiver account
    await this.accountService
      .updateAccount({
        where: { id: data.recieved_from.connect.id },
        data: {
          balance: {
            increment: data.amount,
          },
        },
      })
      .catch((err) => {
        console.log('Error: ', err);
        throw new Error('Unable to credit receiver account');
      });
    return this.prismaService.transaction.create({
      data,
    });
  }

  async updateTransaction(params: {
    where: Prisma.TransactionWhereUniqueInput;
    data: Prisma.TransactionUpdateInput;
  }): Promise<Transaction> {
    const { where, data } = params;
    return this.prismaService.transaction.update({
      data,
      where,
    });
  }

  async deleteTransaction(where: Prisma.TransactionWhereUniqueInput) {
    return this.prismaService.transaction.delete({
      where,
    });
  }
}
