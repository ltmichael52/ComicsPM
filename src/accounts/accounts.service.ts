import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { accounts, Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { accountCreate } from './dtos/accountCreate.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { accountConfirm } from './dtos/accountConfirm.dto';
import { comparePasswordHelper, hashPassword } from 'src/helpers/until';
import { accountLogin } from './dtos/accountLogin.dto';
import { JwtService } from '@nestjs/jwt';
import { changePassword } from './dtos/changePassword.dto';
import { accountForgot } from './dtos/accountForgot.dto';


@Injectable()
export class AccountsService {

  constructor(private readonly databaseService: DatabaseService,
              private readonly mailerService : MailerService,
              private readonly jwtService: JwtService
  ) {}

  async create(createAccountDto: Omit<accountCreate, 'accountid'>): Promise<accounts> {
    
    try {
      const newAccount = await this.databaseService.accounts.create({
        data: {
          username: createAccountDto.userName,
          email: createAccountDto.email,
          status: 0, // Initially set to false
        },
      });
      this.mailerService.sendMail({
        to: createAccountDto.email,
        subject: 'Activate your account',
        template: 'register',
        context: {
          name: createAccountDto.userName,
          activationCode: newAccount.accountid.toString()
        }
      });
      return newAccount;
    } catch (error) {
  
      if (error.code === 'P2002') { // Example: Unique constraint violation
        throw new ConflictException('Username or email already exists');
      }
  
      throw new InternalServerErrorException(`Failed to create account: ${error.message}`);
    }
  }
  
  async confirmAccount(accountConfirm: accountConfirm): Promise<void> {
    try {
      const account = await this.databaseService.accounts.findUnique({
        where: {
          accountid: accountConfirm.code,
        },
      });

      if (!account) {
        throw new ConflictException('Activation code is invalid');
      }

      if (account.status == 1) {
        throw new ConflictException('Account is already active');
      }

      if (accountConfirm.password !== accountConfirm.confirmPassword) {
        throw new ConflictException('Passwords do not match');
      }

      await this.databaseService.accounts.update({
        where: {
          accountid: accountConfirm.code,
        },
        data: {
          status: 1,
          passwordhash: await hashPassword(accountConfirm.password), // Assuming hashPassword is imported and available
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(`Failed to confirm account: ${error.message}`);
    }
  }
  
  async login(accountLogin: accountLogin): Promise<{ success: boolean, accessToken: string }> {
    try {
      const account = await this.databaseService.accounts.findFirst({
        where: {
          OR: [
            { email: accountLogin.email },
            { username: accountLogin.email }
          ]
        },
      });

      if (!account) {
        throw new UnauthorizedException('Invalid credentials');
      }

      if (account.status == 0) {
        throw new UnauthorizedException('Account is not active');
      }

      const isPasswordValid = await comparePasswordHelper(accountLogin.password, account.passwordhash);
      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const payload = {
        sub: account.accountid,
        email: account.email,
        username : account.username
      };

      const accessToken = await this.jwtService.signAsync(payload);
      return { success: true, accessToken };
    } catch (error) {
      throw new InternalServerErrorException(`Failed to login: ${error.message}`);
    }
  }
  
  async changePassword(changePasswordDto: changePassword): Promise<{ accountId: string; message: string }> {
    try {
      const account = await this.databaseService.accounts.findUnique({
        where: {
          accountid: changePasswordDto.accountid,
        },
      });

      if (!account) {
        throw new UnauthorizedException('Account not found');
      }

      if (account.status == 0) {
        throw new UnauthorizedException('Account is not active');
      }

      const isOldPasswordValid = await comparePasswordHelper(changePasswordDto.oldPassword, account.passwordhash);
      if (!isOldPasswordValid) {
        throw new UnauthorizedException('Old password is invalid');
      }

      if (changePasswordDto.newPassword !== changePasswordDto.confirmNewPassword) {
        throw new ConflictException('New passwords do not match');
      }

      await this.databaseService.accounts.update({
        where: {
          accountid: changePasswordDto.accountid,
        },
        data: {
          passwordhash: await hashPassword(changePasswordDto.newPassword),
        },
      });

      return { accountId: changePasswordDto.accountid, message: 'Change password success' };
    } catch (error) {
      throw new InternalServerErrorException(`Failed to change password: ${error.message}`);
    }
  }
  async forgotPassword(accountForgot: accountForgot): Promise<{ success: boolean; message: string }> {
    try {
      const account = await this.databaseService.accounts.findFirst({
        where: {
          email: accountForgot.email,
        },
      });

      if (!account) {
        throw new UnauthorizedException('Account not found');
      }

      this.mailerService.sendMail({
        to: account.email,
        subject: 'Activate your account',
        template: 'register',
        context: {
          name: account.username,
          activationCode: account.accountid.toString()
        }
      });

      return { success: true, message: 'Check Your email' };
    } catch (error) {
      throw new InternalServerErrorException(`Failed to send password reset email: ${error.message}`);
    }
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
