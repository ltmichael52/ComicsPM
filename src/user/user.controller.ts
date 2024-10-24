import { Body, Controller, Get, Param, Put } from "@nestjs/common";
import { UserDto } from "./dto/user.dto";
import { UserService } from "./user.service";

@Controller('user')
export class UserController{
    constructor(private readonly userService:UserService){}

    @Get(':id')
    async getUserInfoById(@Param('id') id:string):Promise<UserDto>{
        return this.userService.getUserInfoById(id);
    }

    @Put(':id')
    async updateUserInfo(@Param('id') id:string, @Body() postData: UserDto):Promise<UserDto>{
        return this.userService.updateUserInfo(id,postData);
    }
    
}