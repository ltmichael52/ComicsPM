import {IsEmail, IsNotEmpty, IsString} from 'class-validator'

export class UserDto{

    @IsString()
    @IsNotEmpty()
    firstname: string
    
    @IsString()
    @IsNotEmpty()
    lastname: string
}
