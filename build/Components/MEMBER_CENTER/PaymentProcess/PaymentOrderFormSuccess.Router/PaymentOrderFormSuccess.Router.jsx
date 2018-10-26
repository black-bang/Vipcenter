import {Page,TopBar,List} from "component"
import './PaymentOrderFormSuccess.scss'
import ScrollView from "AppComponent/ScrollView/ScrollView.jsx";
import CommodityCard from '../../PointsConvert/#Components/CommodityCard/CommodityCard.jsx'
import PointsConvertState from '../../PointsConvert/PointsConvert.mobx.js'
import { observer, inject } from "mobx-react"
import { Icon, Grid } from "antd-mobile";
import icons from "../../IndexPage/#Icon/CommonIcon.module.scss";
import url from "url";
import { NavLink } from "react-router-dom";
import storage from '../../IndexPage/#Api/storage.js'



@observer
class PaymentOrderForm extends React.Component {
  render() {
    return (
		<Page>
        <TopBar>
          <TopBar.Middle>{"下单结果"}</TopBar.Middle>
        </TopBar>

		<ScrollView store={this.store.ScrollViewState} className="ScrollView">
			<List>
			<List.Vertical className="successTop">
				<div className="State">
				{" "}
				<span>
					<Icon type="check-circle" color="#03C235" size="md" />
				</span>{" "}
				{"支付成功"}
				</div>
				<div className="Number">{"实付款:"}{this.state.DeductIntergral}积分</div>
			</List.Vertical>
			</List>
			<List>
			<List.Justify className="ListBtn">
				<NavLink  to={this.toOrderList} className="C_Btn">
				{"返回商城"}
				</NavLink>
				<NavLink to={this.toCreateOrderForm} className="V_Btn">
				{"查看订单"}
				</NavLink>
			</List.Justify>
			</List>
			<List>
				<List.Justify>
					<div className="div_wrap">
						<span />
						<h4>{"积分商城"}</h4>
						<span />
					</div>
				</List.Justify>
			</List>
			{this.store.ScrollViewState.dataList.map((ListData, index) => {
				//console.log(ListData);
				return <CommodityCard {...ListData} key={index} />
			})}
		</ScrollView>		
      </Page>
    );
  }

  constructor(props) {
	super(props);
		this.query = url.parse(this.props.location.search, true)["query"];
		this.store = new PointsConvertState(this.query);
		this.state={
			DeductIntergral:'',
		}
	}
	get toOrderList() {
		return url.format({
		
			pathname: "/PointsConvert",
			query: {
				OpenId:this.query["OpenId"],
				AccountId :storage.VipInfo['AccountId']
			}
		});
	}
  get toCreateOrderForm() {
    return url.format({
			pathname: "/ConvertListRouter/ConvertList/ConvertListItemFormRouter",
			query: { ProductId: this.query["ProductId"],
							 AccountId:storage.VipInfo.AccountId,
		}
    });
  }
  async componentDidMount() {
	document.title = "下单结果";
		console.log(storage.VipInfo.AccounId);
		let number = Math.abs(this.query["DeductIntergral"]);
    this.setState({ DeductIntergral: number });
	  try {
		  await this.store.getCommoditList()
	  } catch (error) {
		  console.log(error);
	  }
  }
}
export default PaymentOrderForm