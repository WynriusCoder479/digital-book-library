import {
	IsEmail,
	IsEnum,
	IsNotEmpty,
	IsString,
	IsStrongPassword,
	Matches,
	MaxLength,
	MinLength,
} from 'class-validator';
import { UserGender } from '@user/utils';

export class CreateUserDto {
	@IsNotEmpty()
	@IsString()
	@MinLength(4)
	@MaxLength(50)
	@Matches(/^[^@\s]+$/)
	username: string;

	@IsNotEmpty()
	@IsEmail()
	email: string;

	@IsNotEmpty()
	@MaxLength(100)
	@IsStrongPassword({
		minLength: 8,
		minUppercase: 1,
		minNumbers: 1,
		minSymbols: 1,
	})
	password: string;

	@IsNotEmpty()
	@IsString()
	firstName: string;

	@IsNotEmpty()
	@IsString()
	lastName: string;

	@IsNotEmpty()
	@IsEnum(UserGender)
	gender: UserGender;

	@IsNotEmpty()
	@IsString()
	@Matches(/^\d{4}-\d{2}-\d{2}$/)
	dateOfBirth: Date;

	@IsString()
	avatarUrl: string;
}
