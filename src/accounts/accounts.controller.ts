import { Controller, Get, Post, Body, Patch, Param, Delete, InternalServerErrorException, Put } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { Prisma } from '@prisma/client';
import { accountCreate } from './dtos/accountCreate.dto';
import { accountConfirm } from './dtos/accountConfirm.dto';
import { accountLogin } from './dtos/accountLogin.dto';
import { changePassword } from './dtos/changePassword.dto';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post()
  create(@Body() createAccountDto: accountCreate) {

    if (!createAccountDto.userName || !createAccountDto.email) {
      throw new InternalServerErrorException('Username or email cannot be undefined');
    }

    return this.accountsService.create(createAccountDto);
  }
  @Put('confirm')
  confirm(@Body() accountConfirm: accountConfirm) {

    if (!accountConfirm.code || !accountConfirm.password) {
      throw new InternalServerErrorException('Code or Password cannot be undefined');
    }
    
    return this.accountsService.confirmAccount(accountConfirm);
  }
  @Patch('change-password')
  async changePassword(@Body() changePasswordDto: changePassword) {
    if (!changePasswordDto.accountid || !changePasswordDto.oldPassword || !changePasswordDto.newPassword || !changePasswordDto.confirmNewPassword) {
      throw new InternalServerErrorException('Account ID, old password, new password, or confirm new password cannot be undefined');
    }

    return this.accountsService.changePassword(changePasswordDto);
  }

  @Post('login')
  login(@Body() accountLogin: accountLogin) {
    return this.accountsService.login(accountLogin);
  }

  @Get()
  findAll() {
    return this.accountsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accountsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAccountDto: Prisma.accountsUpdateInput) {
    return this.accountsService.update(+id, updateAccountDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accountsService.remove(+id);
  }
}
