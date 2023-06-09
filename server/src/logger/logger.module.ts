import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { LoggerService, WinstonConfigurationService } from '@logger/services';
import { LOGGER } from '@logger/key';

@Module({
	imports: [
		WinstonModule.forRootAsync({
			useClass: WinstonConfigurationService,
		}),
	],
	providers: [
		{
			provide: LOGGER,
			useClass: LoggerService,
		},
	],
	exports: [
		{
			provide: LOGGER,
			useClass: LoggerService,
		},
	],
})
export class LoggerModule {}
