import { observable, flow, action, computed, observe } from 'mobx';
import { ajax,storage } from 'api';
import ScrollViewState from "AppComponent/ScrollView/ScrollView.mobx.js";


export default class OrderListState {
	//默认现显示全部
	constructor(query) {
		this.query = query
		this.ScrollViewState1 = new ScrollViewState()
		this.ScrollViewState2 = new ScrollViewState();
		this.ScrollViewState3 = new ScrollViewState();
		this.ScrollViewState4 = new ScrollViewState();
		this.ScrollViewState5 = new ScrollViewState();
	}
	getAllOrderList = flow(function* () {
		try {
			yield this.ScrollViewState1.loadInitData({
				url: "/api/Order/ListAsync",
				data: { orderType: '1', accountId: this.query['AccountId'], orderState: "", openId: this.query["OpenId"]}
			})	
			//console.log(this.ScrollViewState1)	
		} catch (error) {
			throw error
		}
	})
	//待兑换
	getwaitOrderList = flow(function* () {
	    try {
			yield this.ScrollViewState2.loadInitData({
				url: "/api/Order/ListAsync",
				data: { orderType: '1', accountId: this.query['AccountId'], orderState: "1", openId: this.query["OpenId"]}
			})
	    } catch (error) {
	        throw error
	    }
	})
	//待提货
	getwaitTakeList = flow(function* () {
	    try {
			yield this.ScrollViewState3.loadInitData({
				url: "/api/Order/ListAsync",
				data: { orderType: '1', accountId: this.query['AccountId'], orderState: "2", openId: this.query["OpenId"]}
			})
	    } catch (error) {
	        throw error
	    }
	})
	//已完成
	getaleadyList = flow(function* () {
	    try {
			yield this.ScrollViewState4.loadInitData({
				url: "/api/Order/ListAsync",
				data: { orderType: '1', accountId: this.query['AccountId'], orderState: "3" }
			})
	    } catch (error) {
	        throw error
	    }
	})
		//已过期
	getaleadyOverdueList = flow(function* () {
	    try {
			yield this.ScrollViewState5.loadInitData({
				url: "/api/Order/ListAsync",
				data: { orderType: '1', accountId: this.query['AccountId'], orderState: "4" }
			})
	    } catch (error) {
	        throw error
	    }
	})
}