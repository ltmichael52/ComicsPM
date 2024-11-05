import { IsString, IsNotEmpty, IsDateString, IsArray } from 'class-validator';

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
}
