import { IsString, IsNotEmpty, IsDateString, IsArray , ValidateNested} from 'class-validator';
import { Type } from 'class-transformer';

class RelatedComicDto{
    @IsString()
    @IsNotEmpty()
    comicname: string;

    @IsString()
    @IsNotEmpty()
    image: string;
}


export class comicDetailDto {
    @IsString()
    @IsNotEmpty()
    comicname: string;

    @IsString()
    @IsString({ each: true })
    comicauthor: string[];

    @IsString()
    @IsNotEmpty()
    content: string;

    @IsString()
    @IsNotEmpty()
    type: string;

    @IsString()
    @IsNotEmpty()
    image: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsDateString()
    posteddate: Date;

    @IsArray()
    @IsString({ each: true })
    chapters: string[];

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => RelatedComicDto)
    relatedComic: RelatedComicDto[];
}
