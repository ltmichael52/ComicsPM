import { DatabaseService } from "src/database/database.service";
import { UserDto } from "./dto/user.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserService{
    constructor(private database: DatabaseService){}

    async getUserInfoById(id: string):Promise<UserDto>{
        const user = await this.database.accounts.findUnique({
            where:{
                accountid : id,
            },
            select:{
                firstname:true,
                lastname:true,
                dateofbirth: true,
                gender: true,
                refreshtoken:true,
                refreshtokenexpirytime: true,
                avatar:true,
                status:true,
                location:true,
                activeddate:true,
                username:true,
                email:true,
                emailconfirmed:true,
                passwordhash:true,
                phonenumber:true,
                phonenumberconfirmed:true,
                profilename:true
            }
        });
        
        if(!user){
            throw new Error('User not found');
        }
        return user;
    }

    async updateUserInfo(id:string, dto:UserDto): Promise<UserDto>{
        const updatedUser = await this.database.accounts.update({
            where: {accountid: id},
            data:{
                firstname : dto.firstname,
                lastname : dto.lastname,
                dateofbirth: dto.dateofbirth,
                gender: dto.gender,
                refreshtoken: dto.refreshtoken,
                refreshtokenexpirytime: dto.refreshtokenexpirytime,
                avatar: dto.avatar,
                status: dto.status,
                location: dto.location,
                activeddate: dto.activeddate,
                username: dto.username,
                email: dto.email,
                emailconfirmed: dto.emailconfirmed,
                passwordhash: dto.passwordhash,
                phonenumber: dto.phonenumber,
                phonenumberconfirmed: dto.phonenumberconfirmed,
                profilename: dto.profilename
            }
        });
        return updatedUser;
    }
}