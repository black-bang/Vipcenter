import { Page, TopBar, List, ButtonPromise} from "component"
import './PaymentOrderForm.scss'
import { Icon, Grid,Toast} from "antd-mobile";
import icons from "../../IndexPage/#Icon/CommonIcon.module.scss";
import { NavLink,withRouter } from "react-router-dom";
import url from "url";
import { ajax } from "api";
import { observer, inject } from "mobx-react"
import PaymentOrderFormState from './PaymentOrderForm.mobx.js'
import storage from '../../IndexPage/#Api/storage.js'




@withRouter
@observer class PaymentOrderForm extends React.Component {
	render(){
		return (
		<Page>
			<List className="List">
				<List.Justify>
						<div>{"积分:"} 
							<span style={{ marginLeft: '10px', color: "#1D8C1D" }}>
							{this.store.PayOrderform.get("DeductIntergral")}分
							</span>
						</div>
				</List.Justify>
				<List.Justify>
					<div>{"订单编号:"} 
							<span style={{ marginLeft: '10px' }}>
							{this.store.PayOrderform.get("OrderNo")}</span>
					</div>
				</List.Justify>
			</List>
				<List className="" title={"支付方式"}>
					<List.Justify icon={icons.MyMessage} >
						<div>积分支付(剩余积分:{this.state.naturlOrderNumber || '0'}分)</div>
						<div><Icon type='check-circle' color="#03C235" /> </div>
				</List.Justify >
			</List>
			<Page.Bottom>
					<ButtonPromise 
						className="payBtn" 
						style={this.ComputedStyle}
						onClick={this.payOrderBtn.bind(this)}
						theme={ButtonPromise.style.typeSave()}
					>
						{this.state.payText}
					</ButtonPromise>
					<div onClick={this.payOrderBtn.bind(this)}></div>
			</Page.Bottom>
		</Page>
	)}

	constructor(props){
		super(props)
		this.query = url.parse(this.props.location.search, true)["query"];
		this.store = new PaymentOrderFormState(this.query);
		this.state={
			payText:'付款',
			flag:'1',
			naturlOrderNumber:'',
			data:''
		}
	}
	async payOrderBtn() {
		try{
			const result = await ajax.post({
				url:'/api/Order/GoToPayAsync',
				data:{
					orderType:'1',
					orderNo: this.query['OrderNo'],
					accountId: this.query['AccountId'],
					validIntegral: storage.VipInfo.Effectiveintegral
				}
			})
			this.props.history.replace('/PaymentProcessRouter/PaymentOrderFormSuccessRouter/PaymentOrderFormSuccess?ProductId='
				+ this.query["ProductId"] +
				'&DeductIntergral='
				+ this.store.PayOrderform.get("DeductIntergral")+
				'&OpenId='+this.query['OpenId']
				)
			      sessionStorage.removeItem('reciveTime')
		}catch(error){
			throw error
		}
	}
	async componentDidMount(){
		document.title ='订单付款'
		try {
			const willresult = await this.store.getPaymentOrderFormList();
			const result = await ajax.get({
				url: "/api/User_Account/User_IntegralListAsync",
				data: { openId: localStorage.openId }
			});
			console.log(result);
			this.setState({data:result})
			this.setState({ naturlOrderNumber: result.Effectiveintegral})
			let payOrderNumber = Math.abs(this.store.PayOrderform.get("DeductIntergral"));
			let naturlOrderNumber = result.Effectiveintegral;
			if (naturlOrderNumber > payOrderNumber) {
				this.setState({ flag: '1' })
			} else {
				this.setState({ flag: '0' })
			}
			} catch (error) {
			throw error;
			}
		try{
			
		}catch(error){
			throw error;
		}
		
	}
	get ComputedStyle() {
		if (this.state.flag == 1) {
			this.state.payText = "付款";
			return {
				color: "#fff",
				backgroundColor: "#04BE13"
			}
		} else {
			this.state.payText = '积分不足,加油吧!'
			return {
				color: "#fff",
				backgroundColor: "#868686",
				pointerEvents: "none"
			}
		}
		if (this.state.OrderState == 2){
			return {
				color: "#fff",
				backgroundColor: "#868686",
				pointerEvents: "none"
			}
		}
	}
}
export default PaymentOrderForm