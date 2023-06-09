import { CreateUserDto } from '@user/dtos';
import { UserEntity } from '../user.entity';
import { FindOneOptions, FindOptionsWhere } from 'typeorm';

export interface IUserService {
	createUser(createUserDto: CreateUserDto): Promise<UserEntity>;

	findUserById(id: string): Promise<UserEntity>;

	findUserByUsername(username: string): Promise<UserEntity>;

	findUserbyEmail(email: string);

	findUserBy(options: FindOneOptions<UserEntity>): Promise<UserEntity>;

	findUsersbyName(firstName: string, lastName?: string): Promise<UserEntity[]>;

	findUsersBy(
		options: FindOptionsWhere<UserEntity> | FindOptionsWhere<UserEntity>[],
	): Promise<UserEntity[]>;

	findUsers(): Promise<UserEntity[]>;

	updateUser(id: string, updateData: Partial<UserEntity>): Promise<UserEntity>;

	deleteUser(users: UserEntity[]): Promise<boolean>;

	deleteUserBy(options: FindOptionsWhere<UserEntity>): Promise<boolean>;
}
