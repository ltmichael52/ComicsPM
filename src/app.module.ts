import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthorModule } from './author/author.module';

@Module({
  imports: [UserModule,PrismaModule,AuthorModule],

})
export class AppModule {}
