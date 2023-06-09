export interface ILoggerService {
	error(message: string, stack?: string): void;
	warn(message: string): void;
	info(message: string): void;
	http(message: string): void;
	debug(message: string): void;
}
