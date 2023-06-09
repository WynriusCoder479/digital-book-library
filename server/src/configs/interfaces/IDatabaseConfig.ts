export interface IDatabaseConfig {
	postgres: {
		dbHost: string;
		dbPort: number;
		dbUsername: string;
		dbPassword: string;
		dbName: string;
		dbEntitiesPath: string;
		dbMigrationsPath: string;
		dbMigrationTableName: string;
		dbSynchronize: boolean;
	};
	redis: {
		url: string;
	};
}
