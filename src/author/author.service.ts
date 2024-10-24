import { PrismaService } from "src/prisma/prisma.service";
import { AuthorDto } from "./dto/author.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthorService{
    constructor(private prisma: PrismaService){}

    async getAuthorInfoById(id: string):Promise<AuthorDto>{
        console.log(`Fetching user with ID: ${id}`);
        const user = await this.prisma.authors.findUnique({
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
        const updatedUser = await this.prisma.authors.update({
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