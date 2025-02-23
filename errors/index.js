const { BadRequest } = require('./bad-request');
const { CustomError } = require('./custom-error');
const { Forbidden } = require('./forbidden-request');
const { UnAuthenticated } = require('./unauthenticated');


module.exports = {
  BadRequest,
  UnAuthenticated,
  Forbidden,
  CustomError,
}