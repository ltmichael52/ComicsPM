import {IsEmail, IsNotEmpty, IsString} from 'class-validator'

export class accountLogin{

    @IsEmail()
    @IsNotEmpty()
    email: string
    
    @IsString()
    @IsNotEmpty()
    password: string
}
