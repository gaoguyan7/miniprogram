
/**
 * Notes: 后台管理控制模块
 */

const CCMiniController = require('../framework/client/ccmini_controller.js');
const ccminiDataCheck = require('../framework/validate/ccmini_data_check.js');
const ccminiContentCheck = require('../framework/validate/ccmini_content_check.js');

const InfoModel = require('../model/info_model.js');
const UserModel = require('../model/user_model.js');

const AdminService = require('../service/admin_service.js');
const InfoService = require('../service/info_service.js');

const ccminiTimeUtil = require('../framework/utils/ccmini_time_util.js');

class AdminController extends CCMiniController {

	constructor(miniOpenId, request, router, token) {
		super(miniOpenId, request, router, token);

		// 当前时间戳
		this._timestamp = ccminiTimeUtil.time();

		this._admin = null;

	}


	ccminiValidateData(rules = {}) {
		let input = this._request;
		return ccminiDataCheck.check(input, rules);
	}


	async isAdmin() {
		// 判断是否管理员
		let service = new AdminService();
		let admin = await service.isAdmin(this._token);
		this._admin = admin;
		this._adminId = admin.ADMIN_ID;
	}

	async adminLogin() {

		// 数据校验
		let rules = {
			name: 'required|string|min:6|max:30|name=管理员名',
			pwd: 'required|string|min:6|max:30|name=密码',
		};

		// 取得数据
		let input = this.ccminiValidateData(rules);

		let service = new AdminService();
		return await service.adminLogin(input.name, input.pwd);
	}

	async adminHome() {
		await this.isAdmin();

		// 数据校验
		let rules = {

		};

		// 取得数据
		let input = this.ccminiValidateData(rules);

		let service = new AdminService();
		return await service.adminHome();
	}


	/************** 系统设置 BEGIN ********************* */
	async setupEdit() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			title: 'required|string|min:2|max:50|name=平台名称',
			regCheck: 'required|in:0,1|name=用户注册是否需要审核',
			about: 'required|string|min:10|max:50000|name=关于我们'
		};

		// 取得数据
		let input = this.ccminiValidateData(rules);

		await ccminiContentCheck.checkTextMultiAdmin(input);

		let service = new AdminService();
		await service.setupEdit(input);

	}

	async setupLogo() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			fileID: 'required|string',
		};

		// 取得数据
		let input = this.ccminiValidateData(rules);

		let service = new AdminService();
		await service.setupLogo(input.fileID);

	}


	/************** 系统设置 END ********************* */




	/************** 互动 BEGIN ********************* */

	async getInfoList() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			search: 'string|min:1|max:30|name=搜索条件',
			sortType: 'string|name=搜索类型',
			sortVal: 'name=搜索类型值',
			orderBy: 'object|name=排序',
			whereEx: 'object|name=附加查询条件',
			page: 'required|int|default=1',
			size: 'int',
			isTotal: 'bool',
			oldTotal: 'int',
		};

		// 取得数据
		let input = this.ccminiValidateData(rules);

		let service = new AdminService();
		let result = await service.getInfoList(input);

		// 数据格式化
		let list = result.list;
		for (let k in list) {
			list[k].INFO_STATUS_DESC = InfoModel.getDesc('STATUS', list[k].INFO_STATUS);
			list[k].INFO_ADD_TIME = ccminiTimeUtil.timestamp2Time(list[k].INFO_ADD_TIME);
			list[k].INFO_EXPIRE_TIME = ccminiTimeUtil.timestamp2Time(list[k].INFO_EXPIRE_TIME, 'Y-M-D');

			let area = list[k].INFO_REGION_PROVINCE;
			area += (list[k].INFO_REGION_CITY != '全部') ? ' ' + list[k].INFO_REGION_CITY : '';
			area += (list[k].INFO_REGION_COUNTY != '全部') ? ' ' + list[k].INFO_REGION_COUNTY : '';
			list[k].INFO_REGION = area;

		}
		result.list = list;

		return result;

	}

	async getInfoDetail() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			id: 'required|id',
		};

		// 取得数据
		let input = this.ccminiValidateData(rules);

		let service = new AdminService();
		let info = await service.getInfoDetail(input.id);

		if (info) {
			// 显示转换  
		}

		return info;
	}

	async delInfo() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			id: 'required|id',
			uid: 'required|id',
		};

		// 取得数据
		let input = this.ccminiValidateData(rules);


		let service = new InfoService();
		await service.delInfo(input.uid, input.id);

	}

	async sortInfo() { // 数据校验
		await this.isAdmin();

		let rules = {
			id: 'required|id',
			sort: 'required|int',
		};

		// 取得数据
		let input = this.ccminiValidateData(rules);

		let service = new AdminService();
		await service.sortInfo(input.id, input.sort);
	}

	async statusInfo() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			id: 'required|id',
			status: 'required|int|in:0,1,8',
		};

		// 取得数据
		let input = this.ccminiValidateData(rules);

		let service = new AdminService();
		await service.statusInfo(input.id, input.status);
	}
	/************** 互动 END ********************* */


	/************** 用户 BEGIN ********************* */

	async getUserDetail() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			id: 'required|id',
		};

		// 取得数据
		let input = this.ccminiValidateData(rules);

		let service = new AdminService();
		let user = await service.getUser({
			userId: input.id
		});

		if (user) {
			// 显示转换  
			user.USER_ADD_TIME = ccminiTimeUtil.timestamp2Time(user.USER_ADD_TIME);
			user.USER_LOGIN_TIME = ccminiTimeUtil.timestamp2Time(user.USER_LOGIN_TIME);
		}

		return user;
	}


	async getUserList() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			search: 'string|min:1|max:30|name=搜索条件',
			sortType: 'string|name=搜索类型',
			sortVal: 'name=搜索类型值',
			orderBy: 'object|name=排序',
			whereEx: 'object|name=附加查询条件',
			page: 'required|int|default=1',
			size: 'int',
			isTotal: 'bool',
			oldTotal: 'int',
		};

		// 取得数据
		let input = this.ccminiValidateData(rules);

		let service = new AdminService();
		let result = await service.getUserList(0, input);

		// 数据格式化
		let list = result.list;
		for (let k in list) {
			list[k].USER_STATUS_DESC = UserModel.getDesc('STATUS', list[k].USER_STATUS);
			list[k].USER_ADD_TIME = ccminiTimeUtil.timestamp2Time(list[k].USER_ADD_TIME);
			list[k].USER_LOGIN_TIME = ccminiTimeUtil.timestamp2Time(list[k].USER_LOGIN_TIME);

		}
		result.list = list;
		return result;
	}


	async statusUser() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			id: 'required|id',
			status: 'required|int|in:0,1,8,9',
		};

		// 取得数据
		let input = this.ccminiValidateData(rules);

		let service = new AdminService();
		await service.statusUser(input.id, input.status);
	}

	async delUser() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			id: 'required|id',
		};

		// 取得数据
		let input = this.ccminiValidateData(rules);


		let service = new AdminService();
		await service.delUser(input.id);

	}
	/************** 用户 END ********************* */


	async sortNews() { // 数据校验
		await this.isAdmin();

		let rules = {
			id: 'required|id',
			sort: 'required|int',
		};

		// 取得数据
		let input = this.ccminiValidateData(rules);

		await ccminiContentCheck.checkTextMultiAdmin(input);

		let service = new AdminService();
		await service.sortNews(input.id, input.sort);
	}

	async statusNews() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			id: 'required|id',
			status: 'required|int|in:0,1,8',
		};

		// 取得数据
		let input = this.ccminiValidateData(rules);

		let service = new AdminService();
		await service.statusNews(input.id, input.status);
	}



	/************** 资讯 BEGIN ********************* */

	async getNewsList() {

		// 数据校验
		let rules = {
			search: 'string|min:1|max:30|name=搜索条件',
			sortType: 'string|name=搜索类型',
			sortVal: 'name=搜索类型值',
			orderBy: 'object|name=排序',
			whereEx: 'object|name=附加查询条件',
			page: 'required|int|default=1',
			size: 'int',
			isTotal: 'bool',
			oldTotal: 'int',
		};

		// 取得数据
		let input = this.ccminiValidateData(rules);

		let service = new AdminService();
		let result = await service.getNewsList(input);

		// 数据格式化
		let list = result.list;
		for (let k in list) {

			list[k].NEWS_ADD_TIME = ccminiTimeUtil.timestamp2Time(list[k].NEWS_ADD_TIME);

			// 默认图片
			if (list[k].NEWS_PIC && list[k].NEWS_PIC.length > 0)
				list[k].NEWS_PIC = list[k].INFNEWS_PICO_PIC[0]['url'];
			else
				list[k].NEWS_PIC = '';
		}
		result.list = list;

		return result;

	}

	async insertNews() {
		// 数据校验
		let rules = {
			title: 'required|string|min:5|max:50|name=资讯标题',
			cate: 'required|string|min:1|max:15|name=资讯分类',
			content: 'required|string|min:10|max:50000|name=详细介绍'

		};

		// 取得数据
		let input = this.ccminiValidateData(rules);

		await ccminiContentCheck.checkTextMultiAdmin(input);

		let service = new AdminService();
		let result = await service.insertNews(this._adminId, input);

		return result;

	}

	async getNewsDetail() {
		// 数据校验
		let rules = {
			id: 'required|id',
		};

		// 取得数据
		let input = this.ccminiValidateData(rules);

		let service = new AdminService();
		return await service.getNewsDetail(input.id);

	}

	async editNews() {
		// 数据校验
		let rules = {
			id: 'required|id',
			title: 'required|string|min:5|max:50|name=资讯标题',
			cate: 'required|string|min:1|max:15|name=资讯分类',
			content: 'required|string|min:10|max:50000|name=详细介绍',
			desc: 'required|string|min:10|max:200|name=简介',

		};

		// 取得数据
		let input = this.ccminiValidateData(rules);

		await ccminiContentCheck.checkTextMultiAdmin(input);

		let service = new AdminService();
		let result = service.editNews(input);


		return result;
	}

	async delNews() {
		// 数据校验
		let rules = {
			id: 'required|id',
		};

		// 取得数据
		let input = this.ccminiValidateData(rules);

		let service = new AdminService();
		let result = service.delNews(input.id);


		return result;
	}

	async updateNewsPic() {
		// 数据校验
		let rules = {
			newsId: 'required|id',
			imgList: 'array'
		};

		// 取得数据
		let input = this.ccminiValidateData(rules);

		let service = new AdminService();
		return await service.updateNewsPic(input);
	}

	/************** 资讯 END ********************* */

}

module.exports = AdminController;