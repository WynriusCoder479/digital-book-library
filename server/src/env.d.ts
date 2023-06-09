declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV: string;
			PORT: string;
			API_VERSION: string;
			//Postgres config type defination
			DB_HOST: string;
			DB_PORT: string;
			DB_USERNAME: string;
			DB_PASSWORD: string;
			DB_NAME: string;
			DB_ENTITIES_PATH: string;
			DB_MIGRATION_PATH: string;
			DB_MIGRATION_TABLE_NAME: string;
			//Redis config type defination
			REDIS_URL: string;
			//Logger config type defination
			ERROR_LOGS_FILE_PATH: string;
			COMBINE_LOGS_FILE_PATH: string;
			EXPIRED_FILE: string;
			//Mailer config type defination
			MAIL_HOST: string;
			MAIL_PORT: string;
			MAIL_USER: string;
			MAIL_PASS: string;
		}
	}
}

export {};
