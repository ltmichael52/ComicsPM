import { IsNotEmpty, IsString } from 'class-validator';

export class changePassword {
  @IsNotEmpty()
  @IsString()
  oldPassword: string;

  @IsNotEmpty()
  @IsString()
  newPassword: string;

  @IsNotEmpty()
  @IsString()
  confirmNewPassword: string;

  @IsNotEmpty()
  accountid: string;
}



