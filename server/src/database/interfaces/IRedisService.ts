export interface IRedisService {
	get(key: string): Promise<unknown>;
	set(key: string, value: unknown, ttl?: number): Promise<void>;
	del(key: string): Promise<void>;
	reset(key: string): Promise<void>;
}
