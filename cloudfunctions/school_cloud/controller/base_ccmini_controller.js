
/**
 * Notes: 基本业务控制器
 */

const ccminiTimeUtil = require('../framework/utils/ccmini_time_util.js');
const CCMiniController = require('../framework/client/ccmini_controller.js');
const ccminiDataCheck = require('../framework/validate/ccmini_data_check.js');

class BaseCCMiniController extends CCMiniController {

	constructor(miniOpenId, request, router, token) {
		super(miniOpenId, request, router, token); 

		// 云函数入口文件 

		//this._cloud = ccminiCloudUtil.getCloud();
		//this._log = this._cloud.logger();
		/*
		this._db = this._cloud.database();
		this._dbCmd = this._db.command;
		this._dbAggr = this._dbCmd.aggregate;*/

		// 微信上下文   OPENID, APPID,UNIONID,CLIENTIP, CLIENTIPV6
		//this._wxContext = this._cloud.getWXContext();    
		this._userId = miniOpenId;

		// 当前时间戳
		this._timestamp = ccminiTimeUtil.time();


	}
 
	ccminiValidateData(rules = {}) {
		let input = this._request;
		return ccminiDataCheck.check(input, rules);
	}
}

module.exports = BaseCCMiniController;