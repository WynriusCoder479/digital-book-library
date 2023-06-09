import { registerAs } from '@nestjs/config';
import { ConfigKey } from '@configs/key';
import { IAppConfig } from '@configs/interfaces';

export const appConfig = registerAs(
	ConfigKey.APP,
	(): IAppConfig => ({
		port: parseInt(process.env.PORT),
		apiPrefix: `/api/v${process.env.API_VERSION}`,
	}),
);
