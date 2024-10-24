import { Controller, Module } from "@nestjs/common";
import { AuthroController } from "./author.controller";
import { AuthorService } from "./author.service";
import { DatabaseService } from "src/database/database.service";


@Module({
    controllers:[AuthroController],
    providers: [AuthorService,DatabaseService]
})
export class AuthorModule{}
