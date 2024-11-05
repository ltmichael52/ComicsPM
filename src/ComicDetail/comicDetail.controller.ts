import { Body, Controller, Get, Param, Put } from "@nestjs/common";
import { comicDetailDto } from "./dto/comicDetail.dto";
import { ComicDetailService } from "./comicDetail.service";

@Controller('comicDetail')
export class ComicDetailController{
    constructor(private readonly ComicDetailService:ComicDetailService){}

    @Get(':name')
    async getComicDetailByComicName(@Param('name') name:string):Promise<comicDetailDto>{
        return this.ComicDetailService.getComicDetailByComicName(name);
    }

}