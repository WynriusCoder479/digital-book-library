import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '@user/repositories';
import { USER_SERVICE } from '@user/key';
import { UserService } from '@user/services';

@Module({
	imports: [TypeOrmModule.forFeature([UserRepository])],
	providers: [
		{
			provide: USER_SERVICE,
			useClass: UserService,
		},
	],
	exports: [
		{
			provide: USER_SERVICE,
			useClass: UserService,
		},
	],
})
export class UserModule {}
