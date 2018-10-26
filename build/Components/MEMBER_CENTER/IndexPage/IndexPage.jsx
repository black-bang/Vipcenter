import style from "./IndexPage.module.scss"
import {Grid} from "antd-mobile"
import {NavLink ,Route,Redirect} from "react-router-dom"
import {Page,TopBar,Icon} from "component"
import icons from "./#Icon/CommonIcon.module.scss"
//import {Grid1Data,Grid2Data,Grid3Data} from "./IndexPage.AntdUIData.js"
import VIPInfoBar from "./#Components/VIPInfoBar/VIPInfoBar.jsx"
import IndexPageState from "./IndexPage.mobx.js"
import storage from "./#Api/storage.js"
import url from "url"
import { ajax } from 'api'
import { Modal, Toast, WhiteSpace, WingBlank, Button } from "antd-mobile";

const alert = Modal.alert;


class IndexPage extends React.Component {
	render(){
		return (
			<Page ref='box' className={style["IndexPage"]}>
				{/* <div ref='TipInfo' className={style["TipBox"]}>
					<div className={style["addVipText"]}></div>
					<div className={style["addVipCardBtn"]} onClick={this.addVipCard.bind(this)}>{'激活会员卡'}</div>
					<span className={style["addVipCardTip"]}>{'激活立享9.0折'}</span>
				</div> */}
			<Page.Top>
				<VIPInfoBar/>
					
			</Page.Top>
			<Grid 
				columnNum={3} 
				hasLine={false} 
				data={this.Grid1Data}
				className={style["Grid1"]}
				renderItem={this.RenderItem}
			/>
			<div className={style["Grid2Wrap"]}>
				<Grid 
					columnNum={3} 
					hasLine={false} 
					data={this.Grid2Data} 
					className={style["Grid2"]}
					itemStyle={{background:"#E6E6E6"}}
					renderItem={this.RenderItem}
				/>
				<Grid 
					columnNum={3} 
					hasLine={false} 
					data={this.Grid3Data} 
					className={style["Grid3"]}
					itemStyle={{background:"#E6E6E6"}}
					renderItem={this.RenderItem}
				/>								
			</div>
		</Page>
	
	)}
	constructor(props){
	  	super(props);
	  	this.query=url.parse(this.props.location.search,true)["query"];
		this.store=new IndexPageState(this.query);
	}
	// addVipCard() {
	// 	this.props.history.push("/AddUserVIP?openId=" + this.query.openId)
	// }
	async componentDidMount(){
		document.title='会员中心'
	
		localStorage.setItem('openId', this.query['openId'])
		try{
			const result = await this.store.getUserIntegral()
			this.forceUpdate()
			//console.log(result)
			if (result == '请激活会员卡') {
				// this.props.history.replace("/AddUserVIP?openId=" + this.query.openId);
				window.location.href = `http://submodel.jzker.cn/ActiveVipCard/#/?openId=${this.query["openId"]}`;
				///this.refs.TipInfo.style.display='block'
			}else{
				//this.refs.TipInfo.style.display = 'none'
				// this.props.history.go(1)
			}
		}catch(error){
			throw error
		}
		try {
			const result = await ajax.get({
				url: "/api/User_Account/GetTraslateListAsync/",
				data: { accountId: storage.VipInfo['AccountId'] }
			});
			storage.setApplicationStoreInfo(result);
			//console.log(result)
			//console.log(storage.ApplicationStoreInfo);
			this.setState({ data: result });
		} catch (error) {
			throw error
		}

	}
	get Grid1Data(){
		return [{
			text:"个人资料",
			icon:icons["MyMessage"],
			to: '/UserInfo?AccountId=' + storage.VipInfo['AccountId']+'&OpenId='+this.query["openId"]
		},{
			text:"我的卡券",
			icon:icons["MyCard"],
			to: '/CardList?AccountId='+storage.VipInfo['AccountId']
		},{
			text:"在线客服",
			icon:icons["CustomerService"],
			href:`http://onlinecustomers.jzker.cn/#/?openId=${this.query["openId"]}`
		}]
	}
	get Grid2Data(){
		return [{
			text:"积分商城",
			icon:icons["Store"],
			to: '/PointsConvert?AccountId=' + storage.VipInfo['AccountId']+'&OpenId='+this.query["openId"]
		},{
			text:"兑换记录",
			icon:icons["ConvertRecord"],
				to: '/ConvertListRouter/ConvertList/ConvertListItemFormRouter?AccountId=' +storage.VipInfo['AccountId'] + '&OpenId=' + this.query["openId"]
		},{
			text:"积分查询",
			icon:icons["PointQuery"],
			to:'/Points?AccountId='+storage.VipInfo['AccountId']+'&OpenId='+this.query["openId"]
		}]
	}
	get Grid3Data(){
		return [{
			text:"我的订单",
			icon:icons["OrderForm"],
			to: '/MyOrderRouter/ConvertList/ConvertListItemFormRouter?AccountId=' + this.query["accountId"] + '&OpenId=' + this.query["openId"]
		},{
			text:"我的权益",
			icon:icons["MyPower"],
			to:'/MyRights?AccountId='+storage.VipInfo['AccountId']+'&OpenId='+this.query["openId"]
		},{
			text:"适用门店",
			icon:icons["UseShop"],
			to:'/ApplicationStore?AccountId='+storage.VipInfo['AccountId']+'&OpenId='+this.query["openId"]
		}]
	}
	RenderItem=(Item,index)=>{
		const ItemClass=classnames({
			[style["GridItem"]]:true,
			[style["GridLastItem"]]:index==2
		})
		if(Item["href"]){
			return (
			<a className={ItemClass} href={Item["href"]}>
				<Icon icon={Item["icon"]}>
					{Item.text}
				</Icon>			
			</a>			
		)
	}else{
			return (
			<NavLink className={ItemClass} to={Item["to"]}>
				<Icon icon={Item["icon"]}>
					{Item.text}
				</Icon>					
			</NavLink>
		)}
	}
}
export default IndexPage
