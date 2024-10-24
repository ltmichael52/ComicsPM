import { Controller, Module } from "@nestjs/common";
import { AuthroController } from "./author.controller";
import { AuthorService } from "./author.service";
import { PrismaService } from "src/prisma/prisma.service";


@Module({
    controllers:[AuthroController],
    providers: [AuthorService,PrismaService]
})
export class AuthorModule{}
