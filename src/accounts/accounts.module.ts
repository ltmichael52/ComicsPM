import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { DatabaseModule } from 'src/database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports : [DatabaseModule, JwtModule.registerAsync({
    imports: [ConfigModule],
    useFactory: async (configService : ConfigService) => ({
      secret: configService.get<string>('JWT_SECRET'),
      signOptions: {
        expiresIn: configService.get<string>('JWT_ACCESS_TOKEN_EXPIRED'),
      },
    }),
    inject: [ConfigService]
  }),],
  controllers: [AccountsController],
  providers: [AccountsService],
})
export class AccountsModule {}
