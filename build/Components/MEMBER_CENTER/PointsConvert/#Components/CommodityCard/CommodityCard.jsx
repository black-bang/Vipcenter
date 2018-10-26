import css from "./CommodityCard.module.scss"
import {NavLink} from "react-router-dom"
import url from "url"
import storage from '../../../IndexPage/#Api/storage.js'

export default class CommodityCard extends React.PureComponent {

	render(){
		const {
			Price,
			Title,
			EndTime,
			ImagesImageUrl,
			TimeText,
			TitleSub,
			ProductId,
			BeginTime,
			GiftIntegral,
			DeductIntegral,
			attributeDetailsId,
			Ground,
			GroundFig
		}=this.props
		return (
			<NavLink style={this.ComputedStyle.a} className={css["CommodityCard-Shell"]} to={this.toCreateOrderForm}>
			<div style={this.ComputedStyle.b} className={css["already-down"]}>{this.state.flag}</div>
			<div className={css["CommodityCard"]}>
					<div className={css["Picture"]} style={{ backgroundImage: `url(${ImagesImageUrl})`}}/>
				<div className={css["Text"]}>
					<div className={css["MianTitle"]}>
						{Title}
					</div>
					<div style={{color:"#999999"}}>
						<span>{TimeText}</span>
					</div>		
				</div>
				<div className={css["Point"]}>
					<div className={css["Points"]}>
						<span style={{color:"#FF7070",fontWeight:"bold",fontSize:'18px'}}>
							{Math.abs(DeductIntegral)}
						</span>
						<span>{"积分"}</span>
					</div>
					<div style={{color:"#999999",textDecoration:"line-through",marginRight:'3px'}}>
						<span>{"￥"}</span>
						<span style={{color:"#aaa",fontWeight:"bold"}}>
							{Price}
						</span>
					</div>
					<div className={css["Point-Bolck"]} style={this.ComputedStyle.c}>
						{"预约"}
					</div>
				</div>	
			</div>				
		</NavLink>
	)}
	constructor(props){
		super(props)
		this.state={
			flag:''
		}
		//this.query = url.parse(this.props.location.search, true)["query"];
	}
	get ComputedStyle(){
			// 0:已下架
			// 1：正常
			// 2：已过期
		if (this.props.Ground == 1 && this.props.GroundFig == 1) {
			return {
				a: { pointerEvents: "true" },
				b: { display: "none" },
				c: { background: '#FF4401' }
			}
		}
		// }else{
		// 	return {
		// 		a: { pointerEvents: "none" },
		// 		b: { display: "none" },
				
		// 	}
		// }
		if (this.props.GroundFig == 0) {
			this.setState({flag:'已下架'})
			return {
				a: { pointerEvents: "none", display: 'block' },
				b: { display: "block" }
			}
		}
		if (this.props.GroundFig == 2) {
			this.setState({ flag: '已过期' })
			return {
				a: { pointerEvents: "none", display: 'block' },
				b: { display: "block" }
			}
		}
	}
	get test(){	
	}
	async componentDidMount(){
	}
	get toCreateOrderForm(){
		return url.format({
			pathname: '/PaymentProcessRouter/CreateOrderFormRouter/CreateOrderForm',
			query: { ProductId: this.props.ProductId, AttributeDetailsId: this.props.AttributeDetailsId, AccountId: storage.VipInfo.AccountId}
		})
	}
}