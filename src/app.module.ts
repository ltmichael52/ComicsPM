import { Module } from '@nestjs/common';
import { AppService } from './app.service';

import { DatabaseModule } from './database/database.module';
import { AccountsModule } from './accounts/accounts.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthorModule } from './author/author.module';
import { ComicDetailModule } from './ComicDetail/comicDetail.module';

@Module({
  imports: [DatabaseModule,UserModule,AuthorModule,ComicDetailModule,AccountsModule,ConfigModule.forRoot(),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService : ConfigService) => ({
        transport: {
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: {
            user: configService.get<string>('MAIL_USER'),
            pass: configService.get<string>('MAIL_PASSWORD')
          }
        } ,
        defaults: {
          from: '"nest-modules" <modules@nestjs.com>',
        },
        template: {
          dir: process.cwd() + '/src/mail/templates/',
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService]
    })
   ],
  providers: [AppService],

})
export class AppModule {}
