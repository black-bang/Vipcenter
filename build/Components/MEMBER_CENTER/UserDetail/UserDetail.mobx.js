import {observable,action,flow,computed} from "mobx"
import { ajax } from 'api'
import url from 'url'


class UserDetailState {
	constructor(query){
		this.queryOBJ = query;
	}
	@observable OriginUserInfoMap=new Map();
	@observable UserInfoMap=new Map([
		//console.log(UserInfoMap)
		// ["Name",""],
		// ["Mobile",""],
		// ["Birthday",""],
		// ["WeddingDay",""]
	]);
	@computed get UserInfo(){
		return this.UserInfoMap.toJSON()	
		console.log('111')
	}
	@computed get UserInfos() {
		return this.OriginUserInfoMap.toJSON();
	}
	@computed get isModify(){
		let boolArray=[];
		this.UserInfoMap.forEach((value,key)=>{
			boolArray.push(value == this.OriginUserInfoMap.get(key))
		})
		return boolArray.includes(false)
	}
	getUserInfoItem=flow(function*(){
		//动态获取用户信息
		try{
			const result=yield ajax.get({
				url:"/api/User_Account/SeleteVipListAsync",
				data:{openId:this.queryOBJ['OpenId']}
			})
			for(let key in result){
				if(result[key]==null){
					result[key]="";
				}
			}
			this.UserInfoMap = observable.map(result)
			this.OriginUserInfoMap = observable.map(result)
			console.log(result);
		}catch(error){
			throw error
		}
	})
	@action ChangeUserInfo(keyname,keyvalue){
		this.UserInfoMap.set(keyname, keyvalue)
	}
	//--<保存修改>--//
	saveUserInfo=flow(function*(){
		//console.log(this.modifyData);
		let newOBJ=Object.assign({},this.UserInfo)
		// for (let key in newOBJ){
		// 	if (newOBJ[key]='Name'){
		// 		newOBJ[key] ='accountName'
		// 	}
		// 	if (newOBJ[key] = 'VIParea') {
		// 		newOBJ[key] = "vipArea";
		// 	}
		// }
		newOBJ['traslateId'] = this.UserInfo['TraslateId']
		//console.log(newOBJ);
		delete this.UserInfo["TraslateId"];
		newOBJ["translateName"] = this.UserInfo["TranslateName"];
		//console.log(newOBJ);
		delete this.UserInfo["TranslateName"];
		try{
			const result=yield ajax.post({
				url:"/api/User_Account/UpdateVipCustomerInfoAsync",
				data: Object.assign(newOBJ,{ accountId: this.queryOBJ['AccountId']})
			})
		}catch(error){
			throw error
		}
	});
}

export default UserDetailState