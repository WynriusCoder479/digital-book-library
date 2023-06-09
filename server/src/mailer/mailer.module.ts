import { Global, Module } from '@nestjs/common';
import { MailerModule as NodeMailerModules } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ConfigKey, IMailerConfig } from '@/configs';
import * as path from 'path';

@Global()
@Module({
	imports: [
		NodeMailerModules.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => {
				const mailerConfig = configService.get<IMailerConfig>(ConfigKey.MAILER);

				return {
					transport: {
						host: mailerConfig.mailHost,
						port: mailerConfig.mailPort,
						ignoreTLS: true,
						secure: false,
						auth: {
							user: mailerConfig.mailUser,
							pass: mailerConfig.mailPass,
						},
						tls: {
							rejectUnauthorized: false,
						},
					},
					defaults: {
						from: `"Wynrius" <Wyns.IndustryBook@gmail.com>`,
					},
					preview: true,
					template: {
						dir: path.join(__dirname, '../..//templates'),
						adapter: new EjsAdapter(),
						options: {
							strict: true,
						},
					},
				};
			},
		}),
	],
})
export class MailerModule {}
