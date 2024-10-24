import { Body, Controller, Get, Param, Put } from "@nestjs/common";
import { AuthorDto } from "./dto/author.dto";
import { AuthorService } from "./author.service";

@Controller('author')
export class AuthroController{
    constructor(private readonly AuthorService:AuthorService){}

    @Get(':id')
    async getAuthorInfoById(@Param('id') id:string):Promise<AuthorDto>{
        return this.AuthorService.getAuthorInfoById(id);
    }

    @Put(':id')
    async updateAuthorInfo(@Param('id') id:string, @Body() postData: AuthorDto):Promise<AuthorDto>{
        return this.AuthorService.updateAuthorInfo(id,postData);
    }
    
}