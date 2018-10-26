// 积分兑换列表
import './ConvertList.scss'
import url from "url";
import { Toast, WhiteSpace, WingBlank, Button } from "antd-mobile";
import { Tabs, Badge } from "antd-mobile";
import { observer, inject } from "mobx-react"
import { Page, TopBar,List } from "component"
import icons from "../../../../IndexPage/#Icon/CommonIcon.module.scss";
import { Icon, Grid } from "antd-mobile";
import { NavLink } from "react-router-dom";
import ConvertListItem from './ConvertListItem.Item/ConvertListItem.jsx'
import OrderListState from "./ConvertListItem.mobx.js";
import QueueAnim from "rc-queue-anim";
import Url from '../../../../../../static/Order/completePic.png'

const tabs = [
    { title: <Badge>全部<span>({'0'})</span></Badge> },
    { title: <Badge>待付款<span>({'0'})</span></Badge> },
    { title: <Badge>待收货<span>({'0'})</span></Badge> },
    { title: <Badge>已完成<span>({'0'})</span></Badge> },
    { title: <Badge>退换<span>({'0'})</span></Badge> }
];
@observer
class ConvertListItemFormRouter extends React.Component {
  render() {
    return (
      <Page>
        <Tabs
          tabs={tabs}
          initialPage={0}
          onChange={(tab, index) => { }}
          onTabClick={(tab, index) => { }}
        >
          <div style={{ height: '100%',width:'100%', backgroundColor:'#fff',overflow:'hidden',position:'absolute'}}>
            {/* <ConvertListItem></ConvertListItem> */}
            <div className="bgPic"  style={{
              width: '180px',
              height: '170px',
              margin: 'auto',
              marginTop:'120px',
            }} ><img src={Url} /></div>
            <div className="tipText" >{'暂无数据'}</div>
          </div>
        </Tabs>
      </Page>
    );
  }
  constructor(props) {
    super(props);
    this.query = url.parse(this.props.location.search, true)["query"];

  
  }
  async componentDidMount() {
    document.title = "订单列表";

  }
}
export default ConvertListItemFormRouter;