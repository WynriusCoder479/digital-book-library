import { Expose } from 'class-transformer';
import { differenceInYears } from 'date-fns';
import * as _ from 'lodash';
import { nanoid } from 'nanoid';
import {
	BaseEntity,
	BeforeInsert,
	Column,
	CreateDateColumn,
	Entity,
	PrimaryColumn,
	UpdateDateColumn,
} from 'typeorm';
import { UserGender } from './utils';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
	@Expose()
	@PrimaryColumn({ name: 'id' })
	id!: string;

	@Expose()
	@Column({ name: 'username', unique: true })
	username: string;

	@Expose()
	@Column({ name: 'email', unique: true })
	email: string;

	@Column({ name: 'hashed-password' })
	hashedPassword: string;

	@Column({ name: 'first-name' })
	firstName: string;

	@Column({ name: 'last-name' })
	lastName: string;

	@Expose()
	get fullName() {
		return `${this.firstName} ${this.lastName}`;
	}

	@Expose()
	@Column({
		name: 'gender',
		type: 'enum',
		enum: UserGender,
		default: UserGender.MALE,
	})
	gender: UserGender;

	@Expose()
	@Column({ name: 'date-of-birth', type: 'date' })
	dateOfBirth: Date;

	@Expose()
	@Column({ name: 'avatar', default: 'Default-Avatar.com' })
	avatarUrl: string;

	@Expose()
	get age() {
		return differenceInYears(new Date(), new Date(this.dateOfBirth));
	}

	@Column({ name: 'is-active', default: false })
	isActive: boolean;

	@Column({ name: 'refresh-token', nullable: true })
	refreshToken: string;

	@Expose()
	@CreateDateColumn({ name: 'created-at', type: 'timestamp' })
	createdAt!: Date;

	@Expose()
	@UpdateDateColumn({ name: 'updated-at', type: 'timestamp' })
	updatedAt!: Date;

	@BeforeInsert()
	private setId() {
		this.id = nanoid(16);
	}

	constructor(userPartial: Partial<UserEntity>) {
		super();
		_.assign(this, userPartial);
	}
}
