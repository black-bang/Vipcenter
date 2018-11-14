import { observable, action, flow, computed } from "mobx"
import { storage } from "api"
import { toJS } from "mobx"
import { ajax } from "api"
import url from "url"
import ScrollViewState from "AppComponent/ScrollView/ScrollView.mobx.js";

export default class ConvertState {
    constructor(query){
        this.query = query; 
        this.ScrollViewState = new ScrollViewState()
    }
    getConvertList = flow(function* () {
        try {
            yield this.ScrollViewState.loadInitData({
                url: "/api/User_Account/User_IntegralsListAsync/",
                data: { accountId: this.query["AccountId"], openId: this.query['OpenId']}
            });
        } catch (error) {
            throw error;
        }
    })


}