/**
 * Notes: 全局/首页模块业务逻辑

 */

const BaseCCMiniService = require('./base_ccmini_service.js');  
const SetupModel = require('../model/setup_model.js');  

class HomeService extends BaseCCMiniService {


	async getSetup(fields = 'SETUP_TITLE,SETUP_REG_CHECK') {
		let where = {}
		let setup = await SetupModel.getOne(where, fields);


		return setup;

	}


}

module.exports = HomeService;