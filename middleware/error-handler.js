require('dotenv').config();
const { StatusCodes } = require('http-status-codes');
const { CustomError } = require('../errors');
const { sendErrorEmail } = require('../services/email.service');

const errorHandlerMiddleware = async (err, req, res, next) => {
	if (err instanceof CustomError ) {
		res.status(err.statusCode).json({
			message: err.message
		})
	} else {
		await sendErrorEmail(process.env.DEVELOPER_EMAIL, err.message);
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			message: 'Something went wrong with the server',
			status: 'failed',
		})
	}
}

module.exports = {
	errorHandlerMiddleware
}
