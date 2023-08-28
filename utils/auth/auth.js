import nodemailer from 'nodemailer';
import { jwtVerify } from 'jose';

function genOtp() {
	let otp = '';
	for (let i = 0; i < 6; i++) {
		otp += Math.floor(Math.random() * 10);
	}
	return otp;
}

function getRandomString() {
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let result = '';
	for (let i = 0; i < 32; i++) {
		result += characters.charAt(Math.floor(Math.random() * characters.length));
	}
	return result;
}

async function sendMail(email, subject, content) {
	const transporter = nodemailer.createTransport({
		host: process.env.SMTP_HOST,
		port: process.env.NEXT_PUBLIC_SMTP_PORT,
		secure: false,
		requireTLS: true,
		auth: {
			user: process.env.NEXT_PUBLIC_SMTP_USERNAME,
			pass: process.env.NEXT_PUBLIC_SMTP_PASSWORD,
		},
	});

	const mailOptions = {
		from: process.env.NEXT_PUBLIC_SMTP_USERNAME,
		to: email,
		subject: subject,
		html: content,
	}

	transporter.sendMail(mailOptions, function (error, info) {
		if (error) console.log("error is occuring in sending email: ", error);
		else console.log("The mail has been sent: ", info.response);
	});
}

async function getUserfromJwt(token) {
	const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET);
	const decoded = await jwtVerify(token, secret, {
		issuer: "eshop",
		audience: "eshop-users"
	});
	// console.log("decoded: ", decoded);
	return decoded.payload;
}

function isPermittedByRole(permittedRole, userRole) {
	return (permittedRole === userRole || permittedRole === 'admin');
}

const isPermitted = (neededPermission, userPermission) => {
	if (Object.keys(userPermission).length === 0) {
		return false;
	}
	if (Object.keys(neededPermission).length === 0) {
		return true;
	}
	return neededPermission.every(needed => {
		const relatedResource = userPermission.find(user => user.resource === needed.resource);
		if (!relatedResource || !needed.actions.every(action => relatedResource.actions.includes(action))) {
			return false;
		}
		return true;
	});
}

export {
	sendMail,
	genOtp,
	getRandomString,
	getUserfromJwt,
	isPermittedByRole,
	isPermitted,
}