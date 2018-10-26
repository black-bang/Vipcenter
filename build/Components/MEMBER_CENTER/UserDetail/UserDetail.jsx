import CSS from "./UserDetail.module.scss"
import { Page, TopBar, SelectRegion, Lable,List, SelectDate, BasePicker, SwiperCard, ButtonPromise } from "component"
import UserDetailState from './UserDetail.mobx.js'
import EditInput  from '../../page/EditInput/EditInput.jsx'
import {inject,observer} from "mobx-react"
import DateFormat from "date-format"
import {toJS} from "mobx"
import url from "url"
import storage from '../IndexPage/#Api/storage.js'
import { Toast } from 'antd-mobile'

//与CustomerCenter共用数
@inject((stores)=>(stores))
@observer class UserDetail extends React.Component {
	render(){
		const CustomerDetail = this.store.UserInfo;
		return (
			<Page style={{ userSelect: 'true'}}>
			<TopBar>
				<TopBar.Middle>{"完善信息"}</TopBar.Middle>
				<TopBar.Right>
					<ButtonPromise 
					onClick={this.handleSave} 
					theme={ButtonPromise.style.typeSave()}
					active={this.submit}
					>
						{"保存"}
					</ButtonPromise>
				</TopBar.Right>
			</TopBar>
			<Page.Split/>
			<List>		
				<List.Justify arrow={true}>
					<div>{"姓名"}</div>
					<EditInput
						keyname="RealName"
						relation={CustomerDetail["RealName"]}
						placeholder="未输入"
						onChange={this.handleNameChange}
					/>
				</List.Justify>
				<List.Justify arrow={false}>
						<div >{"手机号"}</div>
						<div className="Mobile" style={{marginRight:'18px'}}>
							{CustomerDetail["Mobile"]}
							{/* <EditInput
							
								style={{ width: '120px!important' }}
								keyname="Mobile"
								relation={CustomerDetail["Mobile"]}
								placeholder="未输入"
								onChange={this.handleMobileChange}
							/> */}
					</div>
				</List.Justify>
					<List.Justify arrow={true}>
						<div>{"生日"}</div>
						<SelectDate
							keyname="Birthday"
							onChange={this.handleChange}
							maxDate={moment().toDate()}
							relation={CustomerDetail["Birthday"]}
						/>
					</List.Justify>
				<List.Justify arrow={true}>
					<div>{"结婚纪念日"}</div>
					<SelectDate 
						keyname="WeddingDay" 
						onChange={this.handleChange}
						maxDate={moment().toDate()}
						relation={CustomerDetail["WeddingDay"]} 
					/>		
				</List.Justify>	
				<List.Justify arrow={true}>
					<div>{"地区"}</div>
					<SelectRegion 
						Province={CustomerDetail["Province"]}
						City={CustomerDetail["City"]}
						Area={CustomerDetail["Area"]}
						onChange={this.handleChangePosition}
					/>
				</List.Justify>	
					<List.Justify arrow={true}>
						<div>{"街道"}</div>
						<EditInput
							keyname="Address"
							relation={CustomerDetail["Address"]}
							placeholder="未输入"
							onChange={this.handleNameChange}
						/>
					</List.Justify>
				{/* <List.Justify arrow={true}>
					<div>{"开卡地区"}</div>
					<SelectRegion 
						//Province={CustomerDetail["VipProvince"]}
						City={CustomerDetail["VipCity"]}
						Area={CustomerDetail["VipArea"]}
						onChange={this.handleChangeVipPosition}
					/>
				</List.Justify>				 */}
				<List.Justify arrow={true}>
					<div>{"开卡门店"}</div>
						<BasePicker 
							keyname={CustomerDetail["TraslateName"]}
							relation={CustomerDetail["TranslateId"]}
							data={this.state.dataList} 
							onChange={this.handleChangeTraslate}
						/>
				</List.Justify>
				
			</List>
				<div className={CSS.address}>
					<EditInput style={{ width: '120px', height: '120px' }}
						keyname="Address"
						relation={CustomerDetail["Address"]}
						placeholder="未输入"
						onChange={this.handleNameChange}
					/>
				</div>	
		</Page>		
	)}
	constructor(props){
	  	super(props);
	  	this.query=url.parse(this.props.location.search,true)["query"];
		this.store = new UserDetailState(this.query);
		this.state={
			flag:'false',
			Id:'',
			dataList:[],
			value:'1'
	
		}
	}
	handleChange=(inputOBJ)=>{
		const {keyname,keyvalue}=inputOBJ;
		this.store.ChangeUserInfo(keyname, keyvalue);
	};
	handleNameChange = (inputOBJ) => {
		const { keyname, keyvalue } = inputOBJ;
		console.log(keyvalue.length)
		if (keyvalue.length >= 20) {
			return false
		}
		this.store.ChangeUserInfo(keyname, keyvalue);
	};
	handleChangeTraslate = (inputOBJ) => {
		const { keyname, keyvalue} = inputOBJ;
		console.log(inputOBJ);
		console.log(storage.ApplicationStoreInfo.data[0]);
		const formatData = storage.ApplicationStoreInfo.data.map(Item => {
		return { value: String(Item["TraslateId"]), label: Item["TraslateName"] };
		});
		const findResult = formatData.find(item => {
		//console.log(item)
			return item.value == keyvalue;
		});
		console.log(findResult.label);
		this.store.ChangeUserInfo("TranslateName", findResult.label);
		this.store.ChangeUserInfo('TranslateId', keyvalue);
	};
	handleMobileChange = (inputOBJ) => {	
		console.log(inputOBJ);
		const { keyname, keyvalue } = inputOBJ; 
		if (keyvalue.length >= 11) {
			return false
		}
		console.log(keyvalue.length)
		let re = /^[0-9]*$/;
		if (re.test(keyvalue)){
				this.store.ChangeUserInfo(keyname, keyvalue)
		}else{
			return false
		}
	
		
	
	};
	handleChangePosition=(PositionOBJ)=>{
		const {keyvalue}=PositionOBJ;
		this.store.ChangeUserInfo("Province", keyvalue[0]);
		this.store.ChangeUserInfo("City", keyvalue[1]);
		this.store.ChangeUserInfo("Area", keyvalue[2]);
	};
	handleChangeVipPosition = (PositionOBJ) => {
		const { keyvalue } = PositionOBJ;
		this.store.ChangeUserInfo("VipProvince", keyvalue[0]);
		this.store.ChangeUserInfo("VipCity", keyvalue[1]);
		this.store.ChangeUserInfo("VipArea", keyvalue[2]);
	};
	handleSelectDate=(selectOBJ)=>{
		const {keyname,keyvalue}=selectOBJ;
		this.store.ChangeUserInfo(keyname, keyvalue);
	};

	get submit(){
		const{
			RealName,
			Mobile,
			// Birthday,
			// WeddingDay,
			// Province,
			// City,
			// Area,
			// VipProvince,
			// VipCity,
			// VipArea,
			TranslateId,
			//TranslateName
			Address

		} = this.store.UserInfo
		if(!this.store.isModify){return false}
		if (!RealName){return false}
		if (Mobile.length!==11) { return false }
		// if (!Birthday) { return false }
		// if (!WeddingDay) { return false }
		// if (!AccountName) { return false }
		// if (!Province) { return false }
		// if (!City) { return false }
		// if (!Area) { return false }
		// if (!VipProvince) { return false }
		// if (!VipCity) { return false }
		// if (!VipArea) { return false }
		if (!TranslateId) { return false }
		//if (!TranslateName) { return false }
	     if (!Address) { return false }
	}
	handleSave=async ()=>{
		try{
			
			if (this.store.UserInfo){
				await this.store.saveUserInfo();
				await this.store.getUserInfoItem();
				Toast.info("保存成功", 0.8);
				this.setState({flag:'true'})
				
			}else{
				Toast.info("保存失败", 0.8);
				//console.log(this.store.UserInfo);
				return false
			}
		}catch(error){
			return false;
			//Toast.info(error, 0.8);
			//console.log(this.store.UserInfo);
			// for (let key in this.store.UserInfo) {
			// 	console.log(this.store.UserInfo[key]);
			// }
		
		}
	};
	async componentDidMount() {
		const formatData = storage.ApplicationStoreInfo.data.map(Item => {
			return {
				value: String(Item["TraslateId"]),
				label: Item["TraslateName"],
			};

		});
		// const findResult = formatData.find((item) => {
		// 	//console.log(item)
		// 	return item.value == '16';
		// })
		// console.log(findResult);
		this.setState({ dataList: formatData });
		try {
			await this.store.getUserInfoItem()
			
			
		} catch (error) {
			throw error
		}
	}
}

export default UserDetail
