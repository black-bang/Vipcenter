import { observable, action, flow, computed } from "mobx";
import { ajax } from "api"


export default class PaymentOrderFormState {
	constructor(query) {
		this.query = query
	}
	@observable PayOrderform = new Map();
	getPaymentOrderFormList = flow(function* () {
		try {
			const result = yield ajax.get({
				url: "/api/Order/GetOrderPayInfoAsync",
				data: { OrderNo: this.query["OrderNo"], openId: this.query["OpenId"] }
			})
			
			this.PayOrderform = observable.map(result);
			//console.log(result);
			return result
		} catch (error) {
			throw error
		}
	})

}