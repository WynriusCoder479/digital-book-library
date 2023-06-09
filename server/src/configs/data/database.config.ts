import { registerAs } from '@nestjs/config';
import { ConfigKey } from '@configs/key';
import { IDatabaseConfig } from '@configs/interfaces';

export const databaseConfig = registerAs(
	ConfigKey.DATABASE,
	(): IDatabaseConfig => ({
		postgres: {
			dbHost: process.env.DB_HOST,
			dbPort: parseInt(process.env.DB_PORT),
			dbUsername: process.env.DB_USERNAME,
			dbPassword: process.env.DB_PASSWORD,
			dbName: process.env.DB_NAME,
			dbEntitiesPath: process.env.DB_ENTITIES_PATH,
			dbMigrationsPath: process.env.DB_MIGRATION_PATH,
			dbMigrationTableName: process.env.DB_MIGRATION_TABLE_NAME,
			dbSynchronize: process.env.NODE_ENV === 'development',
		},
		redis: {
			url: process.env.REDIS_URL,
		},
	}),
);
