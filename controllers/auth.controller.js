const jwt = require("jsonwebtoken");
const { loginValidation } = require("../validations/login.validation");
const { BadRequest, Unauthenticated } = require("../errors");
const { StatusCodes } = require("http-status-codes");
const { Users } = require("../models/user.model");
const bcrypt = require("bcryptjs");

const loginUser = async (req, res) => {
	const { email, password } = req.body;
	
	const { error  } = loginValidation(req.body);

	if (error) {
		throw new BadRequest(error.message);
	}
	const user = await Users.findOne({
		where: {email: email}
	});
	// check if email is verfied
	if (!user) {
		throw new BadRequest("User with this email does not exist");
	}
	if (!await bcrypt.compare(password, user.password)) {
		throw new Unauthenticated("Password is not correct");
	}

	const token = jwt.sign({userId: user.userId}, process.env.JWT_KEY, {expiresIn: '30d'}
	);

	// set headers
	res.setHeader('Authorization', token);

	res.status(StatusCodes.ACCEPTED).json({
		status: "success",
		message: "Login Successful"
	});

}


module.exports = {
	loginUser,
};