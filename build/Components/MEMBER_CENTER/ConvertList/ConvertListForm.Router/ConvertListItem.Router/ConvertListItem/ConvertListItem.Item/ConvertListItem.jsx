import { Page, TopBar,List} from "component"
import './ConvertListItem.Item.scss'
import { Icon, Grid } from "antd-mobile";
import icons from "../../../../../IndexPage/#Icon/CommonIcon.module.scss";
// const ImageUrl = icons.MyMessage;
import { observer, inject } from "mobx-react";
import url from 'url';
import { withRouter } from "react-router-dom";


@withRouter
class ConvertListItem extends React.PureComponent {
  render() {
    const  { Id } =this.props
    const activeIndex = this.props.activeIndex;
    return (
      <div className="Convert_list">
        <List.Justify className="translateInfo">
          <div className="translateName">
            <div className="iconPicture" />
            <div>{this.props.TranslateName}</div>
          </div>
          <div
            style={{ color: "#1F8D1F" }}
            onClick={this.LinkOrderType.bind(this)}
          >
            <span style={{ marginRight: "-3px" }}> {this.state.OrderType}</span>
            <span>
              <Icon
                style={{ marginBottom: "-6px" }}
                type="right"
                color=""
                size="md"
              />
            </span>
          </div>
        </List.Justify>
        <div className="ConvertInform" onClick={this.OrderDateil.bind(this, Id)}
          style={activeIndex === Id ? { backgroundColor: 'red' } : {}}
        >
          <div className="leftInform">
            <div
              className="InformPicture"
              style={{
                backgroundImage: `url(${this.props.GoodList[0].ImageUrl})`,
                backgroundSize: "100% 100%"
              }}
            />
            {/* <img className="InformPicture"}} /> */}
            <div className="leftInformName">
              <div
                style={{
                  height: "30px",
                  fontSize: "13px",
                  lineHeight: "30px"
                }}
              >
                {this.props.GoodList[0].GoodTitle}
              </div>
              <div
                style={{
                  height: "24px",
                  fontSize: "12px",
                  color: "#B8B4AE"
                }}
              >
                {this.props.GoodList[0].Name}
              </div>
            </div>
          </div>
          <div>
            <div className="rightInform">
              <div
                className="rightText"
                style={{
                  height: "30px",
                  fontSize: "16px",
                  color: "#08b014",
                  textAlign: "right"
                }}
              >
                {this.props.GoodList[0].DeductIntegral}
                积分
              </div>
              <div
                style={{ height: "25px", textAlign: "right", color: "#08b014" }}
              >
                {"x1"}
              </div>
            </div>
          </div>
        </div>
        <List.Justify className="listBottom">
          <div>
            {"合计:"}
            <span style={{ color: "#08b014" }}>
              {this.props.DeductIntergral}
              积分
            </span>
          </div>
          <div
            style={this.ComputedStyle}
            onClick={this.Link.bind(this)}
            className="contentGuide"
          >
            {this.state.textTip}
          </div>
        </List.Justify>
      </div>
    );
  }
  constructor(props) {
    super(props);
    this.query = url.parse(this.props.location.search, true)["query"];
    this.state = { OrderType: "", OrderNumber: "", textTip: "联系导购" };
  }
  get ComputedStyle() {
    if (this.props.OrderState == 3) {
      return {
        display: "none"
      };
    }
    if (this.props.OrderState == 4) {
      return { display: "none" };
    }
    if (this.props.OrderState == 1) {
      this.setState({ textTip: "去兑换" });
    }
  }
  OrderDateil(Id) {
    if (this.props.OrderState == 1) {
      this.props.history.push(
        "/PaymentProcessRouter/PaymentOrderFormRouter/PaymentOrderForm?AccountId=" +
          this.query["AccountId"] +
          "&OpenId=" +
          this.query["OpenId"] +
          "&OrderNo=" +
          this.props.OrderNo
      );
    }
    if (this.props.OrderState == 2) {
      console.log(this.props.Id);
      this.props.history.push(
        "/ConvertListRouter/ConvertList/ConvertListItemFormRouter/ConvertDatail?AccountId=" +
          this.query["AccountId"] +
          "&OpenId=" +
          this.query["OpenId"] +
          "&OrderNo=" +
          this.props.OrderNo
      );
    }
  }
  Link() {
    if (this.props.OrderState == 2) {
      window.location.href = `http://onlinecustomers.jzker.cn/#/?openId=${localStorage.getItem(
        "openId"
      )}`;
    }
    if (this.props.OrderState == 1) {
      this.props.history.push(
        "/PaymentProcessRouter/PaymentOrderFormRouter/PaymentOrderForm?AccountId=" +
          this.query["AccountId"] +
          "&OpenId=" +
          this.query["OpenId"] +
          "&OrderNo=" +
          this.props.OrderNo
      );
    }
  }
  LinkOrderType() {
    if (this.props.OrderState == 1) {
      this.props.history.push(
        "/PaymentProcessRouter/PaymentOrderFormRouter/PaymentOrderForm?AccountId=" +
          this.query["AccountId"] +
          "&OpenId=" +
          this.query["OpenId"] +
          "&OrderNo=" +
          this.props.OrderNo
      );
    }
    if (this.props.OrderState == 2) {
      this.props.history.push(
        "/ConvertListRouter/ConvertList/ConvertListItemFormRouter/ConvertDatail?AccountId=" +
          this.query["AccountId"] +
          "&OpenId=" +
          this.query["OpenId"] +
          "&OrderNo=" +
          this.props.OrderNo
      );
    }
  }
  async componentDidMount() {
    //console.log(Id);
    let Number = Math.abs(this.props.DeductIntergral);
    this.setState({ OrderNumber: Number });

    if (this.props.OrderState == 1) {
      this.setState({ OrderType: "去兑换" });
    }
    if (this.props.OrderState == 2) {
      this.setState({ OrderType: "待提货" });
    }
    if (this.props.OrderState == 3) {
      this.setState({ OrderType: "已完成" });
    }
    if (this.props.OrderState == 4) {
      this.setState({ OrderType: "已过期" });
    }
  }

}
export default ConvertListItem;