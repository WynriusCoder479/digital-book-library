import { registerAs } from '@nestjs/config';
import { ConfigKey } from '@configs/key';
import { IMailerConfig } from '@configs/interfaces';

export const mailerConfig = registerAs(
	ConfigKey.MAILER,
	(): IMailerConfig => ({
		mailHost: process.env.MAIL_HOST,
		mailPort: parseInt(process.env.MAIL_PORT),
		mailUser: process.env.MAIL_USER,
		mailPass: process.env.MAIL_PASS,
	}),
);
