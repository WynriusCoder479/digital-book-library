import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { IRedisService } from '@database/interfaces';

@Injectable()
export class RedisCacheService implements IRedisService {
	constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

	public async get(key: string) {
		return await this.cache.get(key);
	}

	public async set(key: string, value: unknown, ttl?: number) {
		await this.cache.set(key, value, ttl);
	}

	public async del(key: string) {
		await this.cache.del(key);
	}

	public async reset() {
		await this.cache.reset();
	}
}
