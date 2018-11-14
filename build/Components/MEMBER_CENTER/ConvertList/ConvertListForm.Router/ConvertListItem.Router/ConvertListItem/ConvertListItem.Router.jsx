// 积分兑换列表
import './ConvertList.scss'
import url from "url";
import { Toast, WhiteSpace, WingBlank, Button } from "antd-mobile";
import { Tabs, Badge } from "antd-mobile";
import { observer, inject } from "mobx-react"
import PointsConvertState from "./ConvertListItem.mobx.js"
import { Page, TopBar,List } from "component"
import icons from "../../../../IndexPage/#Icon/CommonIcon.module.scss";
import { Icon, Grid } from "antd-mobile";
import { NavLink } from "react-router-dom";
import ConvertListItem from './ConvertListItem.Item/ConvertListItem.jsx'
import OrderListState from "./ConvertListItem.mobx.js";
import QueueAnim from "rc-queue-anim";
import ScrollView from "AppComponent/ScrollView/ScrollView.jsx"
import Url from '../../../../../../static/Order/completePic.png'
import { IndexRouter } from "react-router";

const store = new OrderListState();

@observer
class ConvertListItemFormRouter extends React.Component {
  render() {
    const tabs = [
      { title: <Badge>全部<span>({this.store.ScrollViewState1.dataList.length ||'0'})</span></Badge> },
      { title: <Badge>待兑换<span>({this.store.ScrollViewState2.dataList.length ||'0'})</span></Badge> },
      { title: <Badge>待提货<span>({this.store.ScrollViewState3.dataList.length ||'0'})</span></Badge> },
      { title: <Badge>已完成<span>({this.store.ScrollViewState4.dataList.length ||'0'})</span></Badge> },
      { title: <Badge>已过期<span>({this.store.ScrollViewState5.dataList.length ||'0'})</span></Badge> }
    ]
    return (
      <Page >
        <div style={{ position: 'fixed',top:'0' ,height:'100%',width:'100%'}}>
        <Tabs
          tabs={tabs}
          initialPage={0}
          onChange={this.toTab.bind(this)}
          // (tab, index) => {
          //   console.log(this);
          // }
          onTabClick={(tab, index) => {}}
        >
            <ScrollView store={this.store.ScrollViewState1}>
              <div ref='hidePic1' style={{
                position: 'absolute',
                display: 'block',
                width: '180px',
                height: '180px',
                left: '0',
                right: '0',
                top: '0',
                bottom: '10%',
                margin: 'auto'
              }} ><img src={Url} /></div>
              {this.store.ScrollViewState1.dataList.map((item, index) => {
                return <ConvertListItem key={index} {...item} />;
              })}
            </ScrollView>
            <ScrollView store={this.store.ScrollViewState2}>
            <div ref='hidePic2' style={{
              position: 'absolute',
              display: 'block',
              width: '180px',
              height: '180px',
              left: '0',
              right: '0',
              top: '0',
              bottom: '10%',
              margin: 'auto'
            }} ><img src={Url} /></div>    
              {this.store.ScrollViewState2.dataList.map((item, index) => {
                return <ConvertListItem key={index} {...item} />;
              })}
          </ScrollView >
            <ScrollView store={this.store.ScrollViewState3}>
              <div ref='hidePic3' style={{
                position: 'absolute',
                display: 'block',
                width: '180px',
                height: '180px',
                left: '0',
                right: '0',
                top: '0',
                 bottom: '10%',
                margin: 'auto'
              }} ><img src={Url} /></div>
              {this.store.ScrollViewState3.dataList.map((item, index) => {
                return <ConvertListItem key={index} {...item} />;
              })}
            </ScrollView>
            <ScrollView store={this.store.ScrollViewState4}>
            <div ref='hidePic4' style={{
              position: 'absolute',
                display: 'block',
              width: '180px',
              height: '180px',
              left: '0',
              right: '0',
              top: '0',
              bottom: '10%',
              zIndex: '1',
              margin: 'auto'
            }} ><img src={Url} /></div>
              {this.store.ScrollViewState4.dataList.map((item, index) => {
                return <ConvertListItem key={index} {...item} />;
              })}
          </ScrollView>
            <ScrollView store={this.store.ScrollViewState5}>
              <div  ref='hidePic5' style={{
                position: 'absolute',
                display: 'none',
                width: '180px',
                height: '180px',
                left: '0',
                right: '0',
                top: '0',
                bottom: '10%',
                zIndex: '1',
                margin: 'auto'
              }} ><img src={Url} /></div>
              {this.store.ScrollViewState5.dataList.map((item, index) => {
                return <ConvertListItem key={index} {...item} />;
              })}
            </ScrollView>
        </Tabs>
        </div>
      </Page>
    );
  }
  constructor(props) {
    super(props);
    this.query = url.parse(this.props.location.search, true)["query"];
    this.store = new OrderListState(this.query);
    this.state={
      all:'',
      order:'',
      wait:'',
      aleady:'',
      never:'',

    }
  
  }
  async toTab(){
    try {
      let listLength1 =  this.store.ScrollViewState1.dataList.length;
      let listLength2 = await this.store.ScrollViewState2.dataList.length;
      let listLength3 = await this.store.ScrollViewState3.dataList.length;
      let listLength4 = await this.store.ScrollViewState4.dataList.length;
      let listLength5 = await this.store.ScrollViewState5.dataList.length;
      this.setState({ all: listLength1})
      this.setState({ order: listLength2 });
      this.setState({ wait: listLength3});
      this.setState({ aleady: listLength4 });
      this.setState({ never: listLength5 });
      console.log(listLength2);
      if (this.state.all > 0) {
        this.refs.hidePic1.style.display = "none";
        //alert('2')
      }
      if (this.state.order > 0) {
        this.refs.hidePic2.style.display = "none";
      } 
      if (this.state.wait > 0) {
        this.refs.hidePic3.style.display = "none";
      }
      if (this.state.aleady > 0) {
        this.refs.hidePic4.style.display = "none";
      }
      if (this.state.never == 0) {
        this.refs.hidePic5.style.display = "block";
      }
  
    } catch (error) {
      throw error;
    }

  }
  async componentDidMount() {
    document.title = "兑换订单列表";

    try {
      this.refs.hidePic1.style.display = 'none'
      this.refs.hidePic2.style.display = 'none'
      const result = await this.store.getAllOrderList();
      const waitresult = await this.store.getwaitTakeList();
      const takeresult = await this.store.getwaitOrderList();
      const aleadyresult = await this.store.getaleadyList();
      const overdueresult = await this.store.getaleadyOverdueList();  
      let listLengths = await this.store.ScrollViewState1.dataList.length;
      let listLengths_ = await this.store.ScrollViewState2.dataList.length;
      if (listLengths == 0) {
        this.refs.hidePic1.style.display = "block";
      }
      if (listLengths_ == 0) {
        this.refs.hidePic2.style.display = "block";
      }
    } catch (error) {
      throw error;
    }
  }
}
export default ConvertListItemFormRouter;