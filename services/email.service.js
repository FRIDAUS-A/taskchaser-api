const nodemailer = require('nodemailer');

const sendEmail = async (email, price) => {
	const transporter = nodemailer.createTransport({
		service: 'Gmail',
		host: 'smtp.gmail.com',
		port: 465,
		secure: true,
		auth: {
		  user: process.env.EMAIL_USER,
		  pass: process.env.EMAIL_PASSWORD
		}
	  });
	
	const mailOptions = {
		from: "ayobamifridaus@gmail.com",
		to: email,
		subject: 'Payment Verification from TaskChaser',
		text: `You just completed a payment of ${price} naira`
	  };
	
	
	  transporter.sendMail(mailOptions, function(err, data) {
		if (err) {
		  return 'failed';
		} else {
		  return 'success';
		}
	  });
}

const sendErrorEmail = async (email, message) => {
	const transporter = nodemailer.createTransport({
		service: 'Gmail',
		host: 'smtp.gmail.com',
		port: 465,
		secure: true,
		auth: {
		  user: process.env.EMAIL_USER,
		  pass: process.env.EMAIL_PASSWORD,
		}
	  });
	
	const mailOptions = {
		from: "ayobamifridaus@gmail.com",
		to: email,
		subject: 'TaskChaser Error',
		text: `${message}`
	  };
	
	
	  transporter.sendMail(mailOptions, function(err, data) {
		if (err) {
		  return 'failed';
		} else {
		  return 'success';
		}
	  });
}

module.exports = {
	sendEmail,
  sendErrorEmail,
}
