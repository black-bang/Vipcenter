import {observer,action,flow} from "mobx"
import ScrollViewState from "AppComponent/ScrollView/ScrollView.mobx.js"
import {ajax} from "api"
import url from 'url'

export default class PointsConvertState {
	constructor(query){
		this.ScrollViewState=new ScrollViewState()
		this.query= query
	}
	getCommoditList=flow(function*(){
		try{
			yield this.ScrollViewState.loadInitData({
				url:"/api/Good_Product/ListAsync",
				data: { AppId: "wx63b76c1236c32ea6", sort: "CreateTime desc", openId: this.query['OpenId']}
			})
			console.log(this.ScrollViewState);
		}catch(error){
			throw error
		}
	})
}