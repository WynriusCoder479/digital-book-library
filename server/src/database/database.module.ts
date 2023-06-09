import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfigurationService } from '@database/services';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ConfigKey, IDatabaseConfig } from '@/configs';
import { redisStore } from 'cache-manager-redis-yet';
import { CACHE } from './key';
import { RedisCacheService } from './services/redis.service';
import { RedisClientOptions } from 'redis';

@Module({
	imports: [
		TypeOrmModule.forRootAsync({ useClass: PostgresConfigurationService }),
		CacheModule.registerAsync<RedisClientOptions>({
			imports: [ConfigModule],
			inject: [ConfigService],
			isGlobal: true,
			useFactory: async (configService: ConfigService) => {
				const dbConfig = configService.get<IDatabaseConfig>(ConfigKey.DATABASE);

				return {
					store: await redisStore({
						url: dbConfig.redis.url,
					}),

					isGlobal: true,
				};
			},
		}),
	],
	providers: [
		{
			provide: CACHE,
			useClass: RedisCacheService,
		},
	],
	exports: [
		{
			provide: CACHE,
			useClass: RedisCacheService,
		},
	],
})
export class DatabaseModule {}
