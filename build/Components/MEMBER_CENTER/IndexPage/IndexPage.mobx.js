import {observable,action,flow,computed} from "mobx"
import storage from "./#Api/storage.js"
import {ajax} from "api"

export default class IndexPageState {
	constructor(query){
		this.query = query;
	}
	getUserIntegral=flow(function*(){
		try{
			const result=yield ajax.get({
				url:"/api/User_Account/User_IntegralDetailListAsync/",
				data:{openId:this.query["openId"]}
			})
			storage.setVipInfo(result)
			return result
		}catch(error){
			throw error
		}
	})
}