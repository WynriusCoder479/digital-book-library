import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AppModule } from './app.module';
import { ConfigKey, IAppConfig } from './configs';
import * as morgan from 'morgan';
import { LOGGER } from '@/logger';
import { ILoggerService } from './logger/interfaces';

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule, {
		rawBody: true,
		cors: {
			origin: '*',
			credentials: true,
		},
		bodyParser: true,
	});

	const logger = app.get(WINSTON_MODULE_NEST_PROVIDER);

	const loggerService = app.get<ILoggerService>(LOGGER);

	app.useLogger(logger);

	const configService = app.get(ConfigService);

	const appConfig = configService.get<IAppConfig>(ConfigKey.APP);

	app.setGlobalPrefix(appConfig.apiPrefix);

	app.use(
		morgan(':method :url :status :res[content-length] - :response-time ms', {
			stream: {
				write: (message) => loggerService.http(message),
			},
		}),
	);

	await app.listen(appConfig.port);
}
bootstrap();
