require('dotenv').config();
// async errors
require('express-async-errors');

// database instance
const sequelize = require('./config/db.config');
const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const logger = require('morgan');
// const displayRoutes = require('express-routemap');
const corsOptions = {
  origin: '*', // Allow all origin
  credentials: false, // Allow cookies if needed
  exposeHeaders: ['Authorization']
};
// swagger initialization and assignment
const YAML = require('yamljs')
const swaggerDocument = YAML.load('./swagger.yaml')
const swaggerUi = require("swagger-ui-express");
app.use(express.json());
app.use(cors()); // access for all origin
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.set('trust proxy', true);
app.use(helmet());
app.use(compression());
app.use(logger('dev'));
// middleware
const { notFoundMiddleware } = require('./middleware/not-found');
const { errorHandlerMiddleware } = require('./middleware/error-handler');

const { userRouter } = require('./routes/user.route');
const { authRouter } = require('./routes/auth.route');
const { productRouter } = require('./routes/product.route');
const { cartRouter } = require('./routes/cart.route');

//use routes
app.use('/api/v1', userRouter);
app.use('/api/v1/auth', authRouter);
app.use("/api/v1", productRouter);
app.use('/api/v1', cartRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//use middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);



const port = process.env.PORT || 5000;

const start = async () => {
	try {
		await sequelize.authenticate();
	} catch (err) {
		console.log(err);
	}
	await sequelize.sync({ alter: false });
	app.listen(port, () => {
		console.log(`Server is listening on port ${port}`);
	})
}
if (process.env.NODE_ENV !== 'test') {
	start();
}

module.exports = app;