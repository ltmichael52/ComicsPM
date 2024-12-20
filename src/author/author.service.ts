import { DatabaseService } from "src/database/database.service";
import { AuthorDto } from "./dto/author.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthorService{
    constructor(private database: DatabaseService){}

    async getAuthorInfoById(id: string):Promise<AuthorDto>{
        console.log(`Fetching user with ID: ${id}`);
        const user = await this.database.authors.findUnique({
            where:{
                authorid : id,
            },
            select:{
                fullname:true,
                createddate:true,
                email: true,
                profileid: true,
                accountid: true
            }
        });
        
        if(!user){
            throw new Error('User not found');
        }
        return user;
    }

    async updateAuthorInfo(id:string, dto:AuthorDto): Promise<AuthorDto>{
        const updatedUser = await this.database.authors.update({
            where: {authorid: id},
            data:{
                fullname:dto.fullname,
                createddate: dto.createddate,
                email: dto.email,
                profileid: dto.profileid,
                accountid: dto.accountid
            }
        });
        return updatedUser;
    }
}