import { Controller, Module } from "@nestjs/common";
import { ComicDetailController } from "./comicDetail.controller";
import { ComicDetailService } from "./comicDetail.service";
import { DatabaseService } from "src/database/database.service";


@Module({
    controllers:[ComicDetailController],
    providers: [ComicDetailService,DatabaseService]
})
export class ComicDetailModule{}
