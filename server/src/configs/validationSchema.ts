import * as Joi from 'joi';

export const validationSchema = Joi.object({
	NODE_ENV: Joi.string()
		.valid('development', 'production', 'provision', 'testing')
		.default('development'),
	PORT: Joi.number().default(8080),
	API_VERSION: Joi.number(),
	DB_HOST: Joi.string(),
	DB_PORT: Joi.number(),
	DB_USERNAME: Joi.string(),
	DB_PASSWORD: Joi.string(),
	DB_NAME: Joi.string(),
	DB_ENTITIES_PATH: Joi.string(),
	DB_MIGRATION_PATH: Joi.string(),
	DB_MIGRATION_TABLE_NAME: Joi.string(),

	REDIS_URL: Joi.string(),

	ERROR_LOGS_FILE_PATH: Joi.string(),
	COMBINE_LOGS_FILE_PATH: Joi.string(),
	EXPIRED_FILE: Joi.string(),

	MAIL_HOST: Joi.string(),
	MAIL_PORT: Joi.number(),
	MAIL_USER: Joi.string(),
	MAIL_PASS: Joi.string(),
});
