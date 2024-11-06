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
                comictyperelations:{
                    select:{
                        comics:{
                            select:{
                                comicname:true,
                                introimage:true,
                            }
                        }
                    }
                }
            }
        })


        const relatedComics = await this.database.comics.findMany({
            where: {
                type: comicDetail?.type,
                comicname: { not: comicDetail?.comicname },  // Exclude the current comic
            },
            select: {
                comicname: true,
                introimage: true,
            },
        });

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
            relatedComic:relatedComics.map(comics => ({
                comicname:comics.comicname,
                image : comics.introimage
            }))
        };
    }
}