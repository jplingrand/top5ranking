'use strict';

module.exports = function DatabaseError(message, extra) {
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;
  this.message = message;
  this.extra = extra?extra:null;
  this.code = 502;
};

require('util').inherits(module.exports, Error);