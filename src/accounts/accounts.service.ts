import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';


@Injectable()
export class AccountsService {

  constructor(private readonly databaseService: DatabaseService) {}

  create(createAccountDto: Prisma.accountsCreateInput) {
    return 'This action adds a new account';
  }

  findAll() {
    return this.databaseService.accounts.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} account`;
  }

  update(id: number, updateAccountDto: Prisma.accountsUpdateInput) {
    return `This action updates a #${id} account`;
  }

  remove(id: number) {
    return `This action removes a #${id} account`;
  }
}
