import { PrismaService } from "src/prisma/prisma.service";
import { UserDto } from "./dto/user.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserService{
    constructor(private prisma: PrismaService){}

    async getUserInfoById(id: string):Promise<UserDto>{
        console.log(`Fetching user with ID: ${id}`);
        const user = await this.prisma.accounts.findUnique({
            where:{
                accountid : id,
            },
            select:{
                firstname:true,
                lastname:true,
            }
        });
        
        if(!user){
            throw new Error('User not found');
        }
        return user;
    }

    async updateUserInfo(id:string, dto:UserDto): Promise<UserDto>{
        const updatedUser = await this.prisma.accounts.update({
            where: {accountid: id},
            data:{
                firstname : dto.firstname,
                lastname : dto.lastname
            }
        });
        return updatedUser;
    }
}