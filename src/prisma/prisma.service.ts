import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
    constructor() {
        super({
            datasources: {
                db: {
                    url: 'postgresql://postgres:Abc%4012345@66.42.43.15:5432/ComicWeb?schema=account',
                },
            },
        });
    }


}
