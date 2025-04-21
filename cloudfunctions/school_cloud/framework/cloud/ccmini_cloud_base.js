/**
 * Notes: 云初始化实例
 */

const ccminiConfig = require('../../comm/ccmini_config.js');
 
function getCloud() {
	const cloud = require('wx-server-sdk');
	cloud.init({
		env: cloud.DYNAMIC_CURRENT_ENV
	});
	return cloud;
}

module.exports = {
	getCloud
}