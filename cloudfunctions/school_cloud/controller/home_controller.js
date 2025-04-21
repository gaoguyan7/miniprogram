
/**
 * Notes: 全局或者主页模块控制器
 */

const BaseCCMiniController = require('./base_ccmini_controller.js');
const HomeService = require('../service/home_service.js');
const ccminiTimeUtil = require('../framework/utils/ccmini_time_util.js');

class HomeController extends BaseCCMiniController {
	 
 
 
	async getSetup() {

		// 数据校验
		let rules = {};

		// 取得数据
		let input = this.ccminiValidateData(rules);

		let service = new HomeService();
		let result = await service.getSetup();

		return result;

	}
 
	async getSetupAll() {

		// 数据校验
		let rules = {};

		// 取得数据
		let input = this.ccminiValidateData(rules);

		let service = new HomeService();
		let result = await service.getSetup('*');

		return result;

	}

}

module.exports = HomeController;