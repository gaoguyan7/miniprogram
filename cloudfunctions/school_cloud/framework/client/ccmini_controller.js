
 
 /**
  * Notes: 基础控制器
  */
 class CCMiniController {

 	constructor(miniOpenId, request, router, token) {
 		this._miniOpenId = miniOpenId;
 		this._request = request;
 		this._router = router;
 		this._token = token;
 	}
 }

 module.exports = CCMiniController;