import css from "./PointsConvert.module.scss"
import {Page,TopBar} from "component"
import ScrollView from "AppComponent/ScrollView/ScrollView.jsx"
import CommodityCard from "./#Components/CommodityCard/CommodityCard.jsx"
import PointsConvertState from "./PointsConvert.mobx.js"
import {observer,inject} from "mobx-react"
import url from "url";
import BannerSrc  from '../../../static/Order/banner_1.png'
import Url from '../../../static/Order/completePic.png'


@observer
class PointsConvert extends React.Component {
	render(){
		return (
		<Page className={css.PointsConvert}>
			<ScrollView store={this.store.ScrollViewState}>
					<div className="bgPic" ref='hidePic' style={{
						position: 'absolute',
						display: 'none',
						width: '180px',
						height: '180px',
						left: '0',
						right: '0',
						top: '0',
						bottom: '50px',
						margin: 'auto'
					}} ><img src={Url} /></div>
				<div className={css.Banner} style={{backgroundImage:`url(${BannerSrc})`,
													backgroundSize:"100% 100%"				
													}}/>
				{this.store.ScrollViewState.dataList.map((ListData,index)=>{
					//console.log(ListData);
					return <CommodityCard {...ListData} key={index}/>
				})}
			</ScrollView>
		</Page>
	)}
	constructor(props){
	  	super(props);
	  	this.state={};
		this.query = url.parse(this.props.location.search, true)["query"];
		this.store = new PointsConvertState(this.query);
	}
	async componentDidMount(){
		document.title='积分商城'
	
		try{
			await this.store.getCommoditList()
			const ListLength = await this.store.ScrollViewState.dataList.length
			if (ListLength == 0){
				this.refs.hidePic.style.display='block'
			}
		}catch(error){
			console.log(error);
		}
	}
}
export default PointsConvert