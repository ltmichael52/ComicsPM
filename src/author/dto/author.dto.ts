import { IsEmail, IsNotEmpty, IsOptional, IsString, IsUUID, IsDateString } from 'class-validator';

export class AuthorDto {
  @IsString()
  @IsOptional()  // Optional because `fullname` is defined as `String?` in the model
  fullname: string;

  @IsEmail()
  @IsOptional()  // Optional because `email` is `String?` in the model
  email: string;

  @IsUUID()
  @IsOptional()  // Optional because `profileid` is `String?` in the model
  profileid: string;

  @IsDateString()
  @IsOptional()  // Optional because `createddate` is `DateTime?`
  createddate: Date;

  @IsUUID()  // UUID for the foreign key `accountid`
  @IsNotEmpty()
  accountid: string;
}
