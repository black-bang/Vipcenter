import { WithLogin, StartToRedner } from "api";

import IndexPage from "./Components/MEMBER_CENTER/IndexPage/IndexPage.jsx"

// 会员中心 ==================================================
//  商品列表
import PointsConvert from "./Components/MEMBER_CENTER/PointsConvert/PointsConvert.jsx";
import PaymentProcessRouter from "./Components/MEMBER_CENTER/PaymentProcess/PaymentProcess.Router.jsx";
// 我的卡券
import CardList from "./Components/MEMBER_CENTER/MY_CARD/CARD_LIST/CardList.jsx";
import CardDatail from "./Components/MEMBER_CENTER/MY_CARD/CARD_DATAIL/CardDatail.jsx";
//积分查询
import Points from "./Components/MEMBER_CENTER/IntegralQuery/Points/Points.jsx";
import Convert from "./Components/MEMBER_CENTER/IntegralQuery/Convert/Convert.jsx";
// 积分兑换列表
import ConvertListRouter from "./Components/MEMBER_CENTER/ConvertList/ConvertList.Router.jsx";
//订单列表
import MyOrderRouter from "./Components/MEMBER_CENTER/MyOrder/MyOrder.Router.jsx";
//我的权益
import MyRights from "./Components/MEMBER_CENTER/MyRights/MyRights.jsx";
//适用门店
import ApplicationStore from "./Components/MEMBER_CENTER/ApplicationStore/ApplicationStore.jsx";
//激活会员卡
import AddUserVIP from "./Components/MEMBER_CENTER/AddUser_VIP/AddUserVIP.jsx";
// 个人资料
import UserInfo from './Components/MEMBER_CENTER/UserDetail/UserDetail.jsx'

import { HashRouter, Route, Switch, Redirect } from "react-router-dom"; 
import { configure } from "mobx"
configure({ enforceActions: "always" });

const target = document.getElementById("AppView");

  ReactDOM.render(<HashRouter>
      <Switch>
        {/* <Route path="/" exact render={() => <Redirect to={"/Code"} />} /> */}
        {/* 会员中心首页 */}
        <Route exact={true} path="/" component={IndexPage} />
        {/* 积分商城 */}
        <Route path="/PointsConvert" component={PointsConvert} />
        <Route path="/PaymentProcessRouter" component={PaymentProcessRouter} />
        {/* 我的卡券 */}
        <Route path="/CardList" component={CardList} />
        <Route path="/CardDatail" component={CardDatail} />
        {/* 积分查询 */}
        <Route path="/Points" component={Points} />
        <Route path="/Convert" component={Convert} />
        {/* 积分兑换列表 */}
        <Route path="/ConvertListRouter" component={ConvertListRouter} />
        {/* 订单列表 */}
        <Route path="/MyOrderRouter" component={MyOrderRouter} />  
        {/* 我的权益 */}
        <Route path="/MyRights" component={MyRights} />
        {/* 适用门店 */}
        <Route path="/ApplicationStore" component={ApplicationStore} />
        {/* 激活会员卡 */}
        <Route path="/AddUserVIP" component={AddUserVIP} />
        {/* 个人资料 */}
        <Route path="/UserInfo" component={UserInfo} />
      </Switch>
    </HashRouter>, target);


