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
  componentWillMount() {
    this.__PreserveRouterComponentEnterAndLeveScrollTop();
  }
  /**
   * 保存路由切换时的 scroll top 的值。
   * */
  __PreserveRouterComponentEnterAndLeveScrollTop() {
    const { children } = this.props;
    const { props } = children || {};
    const { routes } = props || {};
    if (!Array.isArray(routes)) {
      return;
    }
    const { childRoutes } = routes[0];
    if (!Utility.isArray(childRoutes)) {
      return;
    }
    const __KeyScroll = "XTN_ROUTER_SCROLLTOP";
    // 页面离开的时候，记录当前的scrollTop位置
    const __onLeave = args => {
      const __Data = this.state[__KeyScroll] || {};
      __Data[args.toLocaleLowerCase()] = window.document.body.scrollTop;
      this.state[__KeyScroll] = __Data;
    };
    // 页面进入的时候，查找之前的scrollTop位置，有就更新到之前的位置。
    const __onEnter = args => {
      const { location } = args;
      const { pathname } = location;
      const __Data = this.state[__KeyScroll];
      if (__Data && __Data[pathname] && __Data[pathname] > 0) {
        // 为什么这里要晚点时间再更新，因为在切换这后，页面做一些其它的操作所以就设置了这个时间。
        setTimeout(() => {
          window.document.body.scrollTop = __Data[pathname];
        }, 1000);
      }
    };
    // 循环将所有路由，将他们都绑定onLeave及onEnter事件。
    childRoutes.forEach(r => {
      r.onLeave = __onLeave.bind(r, r.path);
      r.onEnter = __onEnter.bind(r);
    });
    /*
    * 这里就怎么说呢，如果调试了的话，就会发现这个数组有两个，有一个IndexRoute
    * IndexRoute 这个是不会存在于 childRoutes 里面的，所以在这里得单独处理一下。
    * 其实下面的代码还是可以完善的。
    * */
    routes.forEach(r => {
      const { path, isIndex } = r;
      if (path) {
        r.onLeave = __onLeave.bind(r, r.path);
        r.onEnter = __onEnter.bind(r);
      }
      // 这里就说明是 IndexRoute 这个路由，
      if (isIndex === 1) {
        r.onLeave = __onLeave.bind(r, "/");
        r.onEnter = __onEnter.bind(r);
      }
    });
  }
}
export default ConvertListItemFormRouter;