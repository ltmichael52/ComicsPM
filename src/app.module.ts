import { Module } from '@nestjs/common';
import { AppService } from './app.service';

import { DatabaseModule } from './database/database.module';
import { AccountsModule } from './accounts/accounts.module';
import { UserModule } from './user/user.module';
import { AuthorModule } from './author/author.module';

@Module({
  imports: [DatabaseModule, AccountsModule,UserModule,AuthorModule],
  providers: [AppService],

})
export class AppModule {}
