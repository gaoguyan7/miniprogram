
/**
 * Notes: 用户模块控制器
 */

const BaseCCMiniController = require('./base_ccmini_controller.js');
const UserModel = require('../model/user_model.js');
const UserService = require('../service/user_service.js');
const ccminiTimeUtil = require('../framework/utils/ccmini_time_util.js');

class UserController extends BaseCCMiniController {
 
	async getMyDetail() {

		// 数据校验
		let rules = {
			fields: 'string|min:1|max:500|name=字段',
		};

		// 取得数据
		let input = this.ccminiValidateData(rules);

		let service = new UserService();
		return await service.getMyDetail(this._userId, input.fields);
	} 
 
  
	async getUser() {

		let rules = {
			userId: 'string|min:15|max:50|name=userId',
			isInfoList: 'bool|name=是否获取互动信息',
			isWellList: 'bool|name=是否获取福利信息',
			fields: 'string|name=显示字段',
		};


		// 取得数据
		let input = this.ccminiValidateData(rules);

		let service = new UserService();
		return await service.getUser(input);

	}
 
 
	async viewUser() { 

		let rules = {
			userId: 'id|required|name=userId', 
			fields: 'string|name=显示字段',
		};


		// 取得数据
		let input = this.ccminiValidateData(rules);

		let service = new UserService();
		return await service.viewUser(this._userId, input);
	}
	
}

module.exports = UserController;