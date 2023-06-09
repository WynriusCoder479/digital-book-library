import { loggerConfig } from '@configs/data';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import {
	WinstonModuleOptionsFactory,
	utilities as WinstonModuleUtilities,
} from 'nest-winston';
import { WinstonModuleOptions } from 'nest-winston/dist/winston.interfaces';
import { addColors, format, transports } from 'winston';
import 'winston-daily-rotate-file';
@Injectable()
export class WinstonConfigurationService
	implements WinstonModuleOptionsFactory
{
	constructor(
		@Inject(loggerConfig.KEY)
		private readonly logConfig: ConfigType<typeof loggerConfig>,
	) {}

	public createWinstonModuleOptions(): WinstonModuleOptions {
		const levels = {
			error: 0,
			warn: 1,
			info: 2,
			http: 3,
			debug: 4,
		};

		const formatFile = format.combine(
			format.splat(),
			format.colorize(),
			format.timestamp(),
			format.prettyPrint(),
		);

		const formatConsole = format.combine(
			format.splat(),
			format.timestamp({ format: this.logConfig.datetimePartern }),
			format.colorize({
				all: true,
			}),
			WinstonModuleUtilities.format.nestLike('server', {
				colors: true,
				prettyPrint: true,
			}),
		);

		const colors = {
			error: 'red',
			warn: 'yellow',
			info: 'green',
			http: 'magenta',
			debug: 'white',
		};

		addColors(colors);

		return {
			levels,
			transports: [
				new transports.Console({
					level: 'debug',
					format: formatConsole,
				}),
				new transports.DailyRotateFile({
					filename: this.logConfig.errorLogsFilePath,
					level: 'error',
					datePattern: this.logConfig.datePartern,
					zippedArchive: false,
					maxFiles: this.logConfig.expiredFile,
					format: formatFile,
				}),
				new transports.DailyRotateFile({
					filename: this.logConfig.combineLogsFilePath,
					datePattern: this.logConfig.datePartern,
					zippedArchive: false,
					maxFiles: this.logConfig.expiredFile,
					format: formatFile,
				}),
			],
		};
	}
}
