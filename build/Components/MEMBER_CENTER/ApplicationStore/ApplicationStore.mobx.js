
import { observer, action, flow } from "mobx"
import ScrollViewState from "AppComponent/ScrollView/ScrollView.mobx.js"
import { ajax } from "api"
import url from 'url'
import storage from "../IndexPage/#Api/storage.js";
export default class ApplicationStoreState {
  constructor(query) {
    this.query = query;
    this.ScrollViewState = new ScrollViewState();
  }
  getApplicationStoreList = flow(function*() {
    try {
     yield this.ScrollViewState.loadInitData({
        url: "/api/User_Account/GetTraslateListAsync/",
       data: { accountId: this.query["AccountId"], openId:this.query['OpenId'] }
      });
    } catch (error) {
      throw error;
    }
  });
}