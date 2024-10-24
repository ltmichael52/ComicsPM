import { IsEmail, IsNotEmpty, IsString, IsOptional, IsBoolean, IsInt, IsDateString } from 'class-validator';

export class UserDto {
  @IsString()
  @IsOptional()  // Optional because of `String?` in Prisma
  profilename: string;

  @IsString()
  @IsNotEmpty()
  firstname: string;

  @IsString()
  @IsNotEmpty()
  lastname: string;

  @IsDateString()  // Expecting an ISO8601 date string
  @IsOptional()  // Optional because of `DateTime?` in Prisma
  dateofbirth: Date;

  @IsInt()
  @IsOptional()  // Optional because of `Int?` in Prisma
  gender: number;

  @IsString()
  @IsOptional()
  refreshtoken: string;

  @IsString()
  @IsOptional()
  refreshtokenexpirytime: string;

  @IsString()
  @IsOptional()
  avatar: string;

  @IsInt()
  @IsOptional()
  status: number;

  @IsString()
  @IsOptional()
  location: string;

  @IsDateString()
  @IsOptional()
  activeddate: Date;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsBoolean()
  @IsOptional()
  emailconfirmed: boolean;

  @IsString()
  @IsOptional()
  passwordhash: string;

  @IsString()
  @IsOptional()
  phonenumber: string;

  @IsBoolean()
  @IsOptional()
  phonenumberconfirmed: boolean;
}
