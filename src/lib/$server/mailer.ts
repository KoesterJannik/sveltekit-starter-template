import * as nodemailer from 'nodemailer';

class MailerService {
	private transporter;

	constructor() {
		console.log(process.env.MAIL_HOST);
		this.transporter = nodemailer.createTransport({
			host: process.env.MAIL_HOST,
			port: Number(process.env.MAIL_PORT),
			secure: false, // true for 465, false for other ports
			auth: {
				user: process.env.MAIL_SENDER,
				pass: process.env.MAIL_PASSWORD
			}
		});
		console.log(this.transporter);
	}

	async sendEmail(to: string, subject: string, html: string): Promise<void> {
		const mailOptions = {
			from: process.env.MAIL_SENDER,
			to,
			subject,
			html
		};
		console.log(mailOptions);
		console.log(this.transporter);

		await this.transporter.sendMail(mailOptions);
	}
}
const mailer = new MailerService();

export default mailer;
