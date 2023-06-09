import { UserEntity } from '@user/user.entity';
import { FindOneOptions, FindOptionsWhere, Repository } from 'typeorm';

export class UserRepository extends Repository<UserEntity> {
	public async findUserById(id: string): Promise<UserEntity> {
		return await this.findOneBy({ id });
	}

	public async findUserByUsername(username: string): Promise<UserEntity> {
		return await this.findOneBy({ username });
	}

	public async findUserByEmail(email: string): Promise<UserEntity> {
		return await this.findOneBy({ email });
	}

	public async findUserBy(
		options: FindOneOptions<UserEntity>,
	): Promise<UserEntity> {
		return await this.findOne(options);
	}

	public async findUsersByName(
		firstName: string,
		lastName?: string,
	): Promise<UserEntity[]> {
		return await this.find(
			lastName === undefined
				? { where: { firstName } }
				: { where: { firstName, lastName } },
		);
	}

	public async findUsersBy(
		options: FindOptionsWhere<UserEntity> | FindOptionsWhere<UserEntity>[],
	): Promise<UserEntity[]> {
		return await this.findBy(options);
	}

	public async findUsers(): Promise<UserEntity[]> {
		return await this.find();
	}

	public async updateUserById(
		id: string,
		dataUpdate: Partial<UserEntity>,
	): Promise<UserEntity> {
		return (await this.update({ id }, { ...dataUpdate })).raw[0];
	}

	public async deleteUser(users: UserEntity[]): Promise<boolean> {
		await this.remove(users);

		return true;
	}

	public async deleteUserBy(
		options: FindOptionsWhere<UserEntity>,
	): Promise<boolean> {
		await super.delete(options);

		return true;
	}
}
