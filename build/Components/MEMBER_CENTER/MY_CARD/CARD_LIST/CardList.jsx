import { ajax } from "api";
import url from "url";
import "./cardList.scss";
import { NavLink } from "react-router-dom";
import Input from "../../../page/BaseIput.jsx";
import { Toast, WhiteSpace, WingBlank, Button } from "antd-mobile";
import { Tabs, Badge } from "antd-mobile";
import CardListItem from "./CardListItem.jsx";
import QueueAnim from "rc-queue-anim";
import CardState from "./Cardmobx";
import { observer } from "mobx-react";
import Url from '../../../../static/Order/completePic.png'


const tabs = [
  { title:  <Badge>未使用<span>({'0'})</span></Badge>},
  { title: <Badge>已使用<span>({'0'})</span></Badge> },
  { title: <Badge>已失效<span>({'0'})</span></Badge> }
];
@observer
class CartList extends React.Component {
  render() {
    return (
      <div className="CartContent">
        <div className="header">
          <div className="header_text">{"卡券列表"}</div>
          <span>{"使用规则"}</span>
        </div>
        <div className="cartBox">
          <Tabs
            tabs={tabs}
            initialPage={0}
            onChange={(tab, index) => {}}
            onTabClick={(tab, index) => {}}
          >
            <div className="Never"
              style={{ height: '100%', width: '100%', backgroundColor: '#fff', overflow: 'hidden', position: 'absolute' }}
            >
              <div className="bgPic" ref='hidePic5' style={{
                position: 'absolute',
                display: 'block',
                width: '180px',
                height: '180px',
                left: '0',
                right: '0',
                top: '0',
                bottom: '0',
                zIndex: '1',
                margin: 'auto'
              }} ><img src={Url} /></div>
              <div className="search">
                <Input
                  type="text"
                  placeholder="请输入兑换码"
                  onChange={this.textvaule.bind(this)}
                />
                <button onClick={this.convertBtn.bind(this)}>{" 兑换"}</button>
              </div>
              <div className="tipText" >{'暂无数据'}</div>
                {/* {this.store.defaultCardList.map((item, index) => {
                  const { Id } = item;
                  // console.log(index);
                  return <CardListItem {...item} key={index} />;
                })} */}
            </div>
            <div
              className="Already"
              style={{ height: '100%', width: '100%', backgroundColor: '#fff', overflow: 'hidden', position: 'absolute' }}
            >
              <div className="bgPic" ref='hidePic5' style={{
                position: 'absolute',
                display: 'block',
                width: '180px',
                height: '180px',
                left: '0',
                right: '0',
                top: '0',
                bottom: '0',
                zIndex: '1',
                margin: 'auto'
              }} ><img src={Url} /></div>
              <div className="tipText" >{'暂无数据'}</div>
                {/* {this.store.alreadyCardList.map((item, index) => {
                  const { Id } = item;
                  // console.log(index);
                  return <CardListItem {...item} key={index} />;
                })} */}
            </div>
            <div
              className="Null"
              style={{ height: '100%', width: '100%', backgroundColor: '#fff', overflow: 'hidden', position: 'absolute' }}
            >
              <div className="bgPic" ref='hidePic5' style={{
                position: 'absolute',
                display: 'block',
                width: '180px',
                height: '180px',
                left: '0',
                right: '0',
                top: '0',
                bottom: '0',
                zIndex: '1',
                margin: 'auto'
              }} ><img src={Url} /></div>
              <div className="tipText" >{'暂无数据'}</div>
                {/* {this.store.nullCardList.map((item, index) => {
                  const { Id } = item;
                  // console.log(index);
                  return <CardListItem {...item} key={index} />;
                })} */}
            </div>
          </Tabs>
        </div>
      </div>
    );
  }
  constructor(props) {
    super(props);
    this.query = url.parse(this.props.location.search, true)["query"];
    //this.store = new CardState(this.query);
    this.state = {
      cartNumber: ""
    };
  }
  textvaule(e, vaule) {
    this.setState({ cartNumber: vaule });
    //console.log(vaule)
  }
  convertBtn() {
    if (this.state.cartNumber.length > 10) {
      //alert(this.state.cartNumber);
    } else {
      Toast.info("兑换码输入错误", 2);
    }
  }
  async componentDidMount() {
    document.title = "卡券列表";
    try {
      //console.log(this.store);
        // const defaultCardList = await this.store.getdefaultCardListState();
        // const aleadyCardList =await this.store.getalreadyCardListState();
        // const nullCardList = await this.store.getnullCardListState();

        //const result = await this.store.getCardListState();
      //console.log(this.store);
    } catch (error) {
      throw error;
    }
  }
}
export default CartList;
