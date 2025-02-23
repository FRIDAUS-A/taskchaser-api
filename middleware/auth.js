const { Unauthenticated } = require("../errors")
const jwt = require("jsonwebtoken")


const authMiddleware = (req, res, next) => {
	const authHeader = req.headers.authorization
	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		throw new Unauthenticated("No token provided or Check if your token starts with 'Bearer '")
	}
	const token = authHeader.split(' ')[1]
	console.log("token", token);
	try {
		const decoded =  jwt.verify(token, process.env.JWT_KEY)
		const { userId } = decoded;
		console.log("userId", userId)
		req.params.userId = userId;
		console.log("req user", req.params);
		next();
	} catch(error) {
		throw new Unauthenticated("Token is Invalid")
	}
}

module.exports = { authMiddleware }
