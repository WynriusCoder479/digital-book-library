import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validationSchema } from '@configs/validationSchema';
import {
	appConfig,
	databaseConfig,
	loggerConfig,
	mailerConfig,
} from '@configs/data';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			cache: true,
			expandVariables: true,
			load: [appConfig, databaseConfig, loggerConfig, mailerConfig],
			envFilePath: process.env.NODE_ENV === 'development' ? '.env.dev' : '.env',
			validationSchema,
			validationOptions: {
				abortEarly: true,
			},
		}),
	],
})
export class ConfigsModule {}
