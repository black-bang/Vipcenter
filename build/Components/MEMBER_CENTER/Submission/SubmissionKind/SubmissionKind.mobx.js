import { observable, action, flow, computed, Reaction } from "mobx"
import storage from "../../IndexPage/#Api/storage.js";
import ScrollViewState from "AppComponent/ScrollView/ScrollView.mobx.js";
export default class SubmissionKindState {
    constructor(query){
        this.query = query
        this.ScrollViewState1 = new ScrollViewState()
        this.ScrollViewState2 = new ScrollViewState();
        this.ScrollViewState3 = new ScrollViewState();
    }
    getSubmissionKindList =flow(function*(){
        try {
            // this.query['OpenId']
            yield this.ScrollViewState1.loadInitData({
                url: "/api/User_Account/SelectUser_EvidenceListAsync/",
                data: { openId: this.query['OpenId'], AuditState:''  }
                // openId: this.query['OpenId']
                // storage.VipInfo.translateId
            });
        } catch (error) {
            throw error;
        }
    })
    getSubmissionKindList_1 = flow(function* () {
        try {
            // this.query['OpenId']
            yield this.ScrollViewState2.loadInitData({
                url: "/api/User_Account/SelectUser_EvidenceListAsync/",
                data: { openId: this.query['OpenId'], AuditState: '0'}
                // storage.VipInfo.translateId
            });
        } catch (error) {
            throw error;
        }
    })
    getSubmissionKindList_2 = flow(function* () {
        try {
            // this.query['OpenId']
            yield this.ScrollViewState3.loadInitData({
                url: "/api/User_Account/SelectUser_EvidenceListAsync/",
                data: { openId: this.query['OpenId'], AuditState:'4'}
                // storage.VipInfo.translateId
            });
        } catch (error) {
            throw error;
        }
    })
}