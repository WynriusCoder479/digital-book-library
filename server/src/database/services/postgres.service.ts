import { databaseConfig } from '@/configs';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class PostgresConfigurationService implements TypeOrmOptionsFactory {
	constructor(
		@Inject(databaseConfig.KEY)
		private readonly dbConfig: ConfigType<typeof databaseConfig>,
	) {}

	public createTypeOrmOptions(): TypeOrmModuleOptions {
		return {
			type: 'postgres',
			host: this.dbConfig.postgres.dbHost,
			port: this.dbConfig.postgres.dbPort,
			username: this.dbConfig.postgres.dbUsername,
			password: this.dbConfig.postgres.dbPassword,
			database: this.dbConfig.postgres.dbName,
			entities: [this.dbConfig.postgres.dbEntitiesPath],
			migrations: [this.dbConfig.postgres.dbMigrationsPath],
			migrationsTableName: this.dbConfig.postgres.dbMigrationTableName,
			synchronize: this.dbConfig.postgres.dbSynchronize,
			logger: 'file',
			logging: 'all',
		};
	}
}
