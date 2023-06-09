import { registerAs } from '@nestjs/config';
import { ConfigKey } from '../key';
import { ILoggerConfig } from '../interfaces';

export const loggerConfig = registerAs(
	ConfigKey.LOGGER,
	(): ILoggerConfig => ({
		errorLogsFilePath: process.env.ERROR_LOGS_FILE_PATH,
		combineLogsFilePath: process.env.COMBINE_LOGS_FILE_PATH,
		expiredFile: process.env.EXPIRED_FILE,
		datePartern: 'YYYY-MM-DD',
		datetimePartern: 'YYYY-MM-DD HH:mm:ss',
	}),
);
