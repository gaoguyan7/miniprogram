
/**
 * Notes: 用户模块业务逻辑
 */

const BaseCCMiniService = require('./base_ccmini_service.js');
const ccminiUtil = require('../framework/utils/ccmini_util.js');

const UserModel = require('../model/user_model.js');

// 用户信息返回字段
const FILEDS_USER_BASE = 'USER_ADD_TIME,USER_VIEW_CNT,USER_EDU,USER_ITEM,USER_INFO_CNT,USER_NAME,USER_BIRTH,USER_SEX,USER_PIC,USER_STATUS,USER_CITY,USER_COMPANY,USER_TRADE,USER_COMPANY_DUTY,USER_ENROLL,USER_GRAD,USER_LOGIN_TIME,USER_MINI_OPENID';

const FILEDS_USER_DETAIL = 'USER_DESC,USER_RESOURCE,USER_MOBILE,USER_QQ,USER_WECHAT,USER_EMAIL';

class UserService extends BaseCCMiniService {

	async viewUser(meId, {
		userId,
		fields = FILEDS_USER_BASE + ',' + FILEDS_USER_DETAIL
	}) {

		let where = {
			USER_MINI_OPENID: userId
		};
		UserModel.inc(where, 'USER_VIEW_CNT', 1);


		return await this.getUser({
			userId,
			fields
		});


	}

	async getUser({
		userId,
		fields = FILEDS_USER_BASE + ',' + FILEDS_USER_DETAIL
	}) {

		let where = {
			USER_MINI_OPENID: userId,
			USER_STATUS: UserModel.STATUS.COMM
		}
		let user = await UserModel.getOne(where, fields);
		if (!user) return null;

		return user;
	}

	async getMyDetail(userId,
		fields = 'USER_ITEM,USER_SEX,USER_INFO_CNT,USER_VIEW_CNT,USER_NAME,USER_PIC,USER_STATUS,USER_ID'
	) {
		return await this.getUserMyBase(userId, fields);
	}
}

module.exports = UserService;