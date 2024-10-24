import { Module } from '@nestjs/common';
import { AppService } from './app.service';

import { DatabaseModule } from './database/database.module';
import { AccountsModule } from './accounts/accounts.module';

@Module({
  imports: [DatabaseModule, AccountsModule],
  providers: [AppService],

})
export class AppModule {}
