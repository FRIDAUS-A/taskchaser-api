const { Sequelize } = require('sequelize');
const database = process.env.DATABASE_NAME
const username = process.env.DATABASE_USER
const password = process.env.DATABASE_PASSWORD
const host = process.env.DATABASE_HOST
const dialect = process.env.DIALECT

const sequelize = new Sequelize(database, username, password,  {
	host: host,
	dialect: dialect || 'mysql',
	dialectOptions: {
		ssl: {
		  require: 'false',
			rejectUnauthorized: false, // Disable SSL certificate validation
		}
	  }
});

module.exports = sequelize;
