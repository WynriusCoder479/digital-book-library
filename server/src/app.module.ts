import { Module } from '@nestjs/common';
import { ConfigsModule } from '@/configs';
import { DatabaseModule } from '@/database';
import { LoggerModule } from '@/logger';
import { UserModule } from '@/user';
import { MailerModule } from '@/mailer';
import { AppController } from './app.controller';

@Module({
	imports: [
		ConfigsModule,
		DatabaseModule,
		LoggerModule,
		UserModule,
		MailerModule,
	],
	controllers: [AppController],
})
export class AppModule {}
