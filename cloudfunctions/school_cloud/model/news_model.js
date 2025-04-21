/**
 * Notes: 资讯实体
 */


const BaseCCMiniModel = require('./base_ccmini_model.js');

class NewsModel extends BaseCCMiniModel {

}

// 集合名
NewsModel.CL = "news";

NewsModel.CCMINI_DB_STRUCTURE = {
	NEWS_ID: 'string|true',
	NEWS_ADMIN_ID: 'string|true|default=0',

	NEWS_TITLE: 'string|true|comment=标题',
	NEWS_CATE: 'string|true|comment=分类',
	NEWS_DESC: 'string|false|comment=',
	NEWS_CONTENT: 'string|true|comment=',
	NEWS_STATUS: 'int|true|default=1|comment=', 
	NEWS_ORDER: 'int|true|default=9999',

	NEWS_VIEW_CNT: 'int|true|default=0|comment=', 
 

	NEWS_PIC: 'array|false|default=[]|comment=',

	NEWS_ADD_TIME: 'int|true',
	NEWS_EDIT_TIME: 'int|true', 
	NEWS_ADD_IP: 'string|false',
	NEWS_EDIT_IP: 'string|false',
};

// 字段前缀
NewsModel.CCMINI_FIELD_PREFIX = "NEWS_";
 

module.exports = NewsModel;