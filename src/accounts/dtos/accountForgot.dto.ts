import {IsEmail, IsNotEmpty, IsString} from 'class-validator'

export class accountForgot{

    @IsEmail()
    @IsNotEmpty()
    email: string
    
}
