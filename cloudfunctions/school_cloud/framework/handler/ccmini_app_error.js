/**
 * Notes: 应用异常处理类
 */


const ccminiAppCode = require('./ccmini_app_code.js');

class CCMiniAppError extends Error {
    constructor(message, code = ccminiAppCode.LOGIC) {
      super(message);  
	  this.name = 'CCMiniAppError';  
	  this.code = code;
    }
  }

  module.exports = CCMiniAppError;