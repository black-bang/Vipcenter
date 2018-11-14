import { observable, action, flow, computed, Reaction } from "mobx"
import {ajax} from 'api'
import { Toast } from "antd-mobile";
export default class SubmissionDetaState {
    constructor(query) {
        this.query = query;
    }
    @observable ListMap= new Map([
        ["User_Evidence_Image",[]]
    ])
    @computed get List(){
        return this.ListMap.toJSON()
    }
    getDetaList = flow(function* () {
        try {
            const result = yield ajax.get({
                url: "/api/User_Account/SelectUser_EvidenceListAsync/",
               data: { openId: this.query['OpenId'], evidenceId: this.query['Id']}
            });
            this.ListMap= observable.map(result.data[0])
        } catch (error) {
            throw error;
        }
    })
    updeteList = flow(function* () {
        try {
            const result = yield ajax.post({
                url: "/api/User_Account/UpdateUser_EvidenceListAsync",
                data: { 
                     openId: this.query['OpenId'],
                     evidenceId: this.query['Id'], 
                     auditState:'3' }
            });
            Toast.info('取消成功',.8)
        } catch (error) {
            throw error;
        }
    })
}