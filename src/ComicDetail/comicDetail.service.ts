import { DatabaseService } from "src/database/database.service";
import { comicDetailDto } from "./dto/comicDetail.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ComicDetailService{
    constructor(private database: DatabaseService){}

    async getComicDetailByComicName(name:string): Promise<comicDetailDto | null> {
        const comicDetail = await this.database.comics.findUnique({
            where:{
                comicname: name,
            },
            select:{
                comicname: true,
                content: true,
                type:true,
                introimage:true,
                posteddate:true,
                chapters:true,
                description:true,
                comicchapters : {
                    select:{
                        chaptername:true,
                    }
                },
                comicauthors:{
                    select:{
                        authors:{
                            select:{
                                authorname:true
                            }
                        }
                    }
                },
            }
        })

        if (!comicDetail) {
            return null;  // Return null if no comic is found
        }


        return {
            comicname: comicDetail.comicname,
            comicauthor: comicDetail.comicauthors.map(author=>author.authors.authorname),
            image: comicDetail.introimage,
            description: comicDetail.description,
            posteddate: comicDetail.posteddate,
            content: comicDetail.content,
            type: comicDetail.type,
            chapters:comicDetail.comicchapters.map(chapter=>chapter.chaptername),
        };
    }
}