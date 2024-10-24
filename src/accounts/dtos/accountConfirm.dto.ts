import {IsEmail, IsNotEmpty, IsString} from 'class-validator'

export class accountConfirm{

    @IsNotEmpty()
    @IsString()
    code: string
    
    @IsString()
    @IsNotEmpty()
    password: string

    @IsString()
    @IsNotEmpty()
    confirmPassword: string

}
