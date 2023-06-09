import { Inject, Injectable } from '@nestjs/common';
import { ILoggerService } from '@logger/interfaces';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

@Injectable()
export class LoggerService implements ILoggerService {
	constructor(
		@Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
	) {}

	info(message: string): void {
		this.logger.info(message);
	}

	error(message: string, stack?: string): void {
		this.logger.error(message, stack);
	}

	warn(message: string): void {
		this.logger.warn(message);
	}

	http(message: string): void {
		this.logger.http(message);
	}

	debug(message: string): void {
		this.logger.debug(message);
	}
}
