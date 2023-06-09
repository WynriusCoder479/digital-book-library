import { MailerService } from '@nestjs-modules/mailer';
import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
	constructor(private readonly mailerService: MailerService) {}

	@Get('/test-mail')
	async testMail() {
		this.mailerService
			.sendMail({
				from: 'Test@gmail.com',
				to: 'Client@gmail.com',
				subject: 'Test OTP mail',
				template: 'otp',
				context: {
					otp: '123456',
				},
			})
			.then(() => 0)
			.catch((err) => err);

		return 'Test mail module';
	}
}
