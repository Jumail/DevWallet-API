import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { TransactionService } from './transaction.service';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get('/')
  async getAllTransactions() {
    return this.transactionService.getAllTransactions({});
  }

  @Get('/:id')
  async getTransactionById(@Param('id') id: string) {
    return this.transactionService.getTransactionById({ id });
  }

  @Post('/:sender_account_id')
  async createTransaction(
    @Param('sender_account_id') sender_account_id: string,
    @Body()
    body: {
      amount: number;
      currency: number;
      remarks: string;
      receiver_id: string;
    },
  ) {
    return this.transactionService.createTransaction(
      {
        amount: body.amount,
        currency: { connect: { id: body.currency } },
        remarks: body.remarks,
        sent_from: { connect: { id: sender_account_id } },
        recieved_from: { connect: { id: body.receiver_id } },
      },
      sender_account_id,
    );
  }

  @Patch('/:id')
  async updateTransaction(
    @Param('id') id: string,
    @Body() data: Prisma.TransactionUpdateInput,
  ) {
    return this.transactionService.updateTransaction({
      where: { id },
      data,
    });
  }
}
