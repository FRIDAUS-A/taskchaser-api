const { BadRequest } = require('./bad-request');
const { CustomError } = require('./custom-error');
const { Forbidden } = require('./forbidden-request');
const { Unauthenticated } = require('./unauthenticated');


module.exports = {
  BadRequest,
  Unauthenticated,
  Forbidden,
  CustomError,
}
