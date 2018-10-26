
import { observable, action, flow, computed } from "mobx";
import { ajax } from "api"

export default class CreateOrderFormState {
                 constructor(query) {
                   this.query = query;
                 }
                 @observable
                 ConvertInform = new Map()
                 getCreateOrderFormList = flow(function*() {
                   try {
                     const result = yield ajax.get({
                       url: "/api/Good_Product/ModelAsync",
                       data: {
                         producId: this.query["ProductId"],
                         openId:localStorage.getItem('openId')
                       }
                     });
                     this.ConvertInform = observable.map(result);
                     return result;
                   } catch (error) {
                     throw error;
                   }
                 });
               }