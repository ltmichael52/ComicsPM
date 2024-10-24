import {IsEmail, IsNotEmpty, IsString} from 'class-validator'

export class accountCreate{

    @IsEmail()
    @IsNotEmpty()
    email: string
    
    @IsString()
    @IsNotEmpty()
    userName: string
}
