import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '@user/repositories';
import { IUserService } from '@user/interfaces';
import { CreateUserDto } from '@user/dtos';
import { UserEntity } from '@user/user.entity';
import * as argon2 from 'argon2';
import { FindOneOptions, FindOptionsWhere } from 'typeorm';

@Injectable()
export class UserService implements IUserService {
	constructor(
		@InjectRepository(UserRepository)
		private readonly userRepository: UserRepository,
	) {}

	async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
		const newUser = this.userRepository.create({
			...createUserDto,
			hashedPassword: await argon2.hash(createUserDto.password),
		});

		return await this.userRepository.save(newUser);
	}

	findUserById(id: string): Promise<UserEntity> {
		return this.userRepository.findUserById(id);
	}

	findUserByUsername(username: string): Promise<UserEntity> {
		return this.userRepository.findUserByUsername(username);
	}

	findUserbyEmail(email: string) {
		return this.userRepository.findUserByEmail(email);
	}

	findUserBy(options: FindOneOptions<UserEntity>): Promise<UserEntity> {
		return this.userRepository.findUserBy(options);
	}

	findUsersbyName(firstName: string, lastName?: string): Promise<UserEntity[]> {
		return this.userRepository.findUsersByName(firstName, lastName);
	}

	findUsersBy(
		options: FindOptionsWhere<UserEntity> | FindOptionsWhere<UserEntity>[],
	): Promise<UserEntity[]> {
		return this.userRepository.findUsersBy(options);
	}

	findUsers(): Promise<UserEntity[]> {
		return this.findUsers();
	}

	updateUser(id: string, updateData: Partial<UserEntity>): Promise<UserEntity> {
		return this.userRepository.updateUserById(id, updateData);
	}

	deleteUser(users: UserEntity[]): Promise<boolean> {
		return this.userRepository.deleteUser(users);
	}

	deleteUserBy(options: FindOptionsWhere<UserEntity>): Promise<boolean> {
		return this.userRepository.deleteUserBy(options);
	}
}
