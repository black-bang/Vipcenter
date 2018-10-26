import css from "./CreateOrderForm.module.scss"
import icons from "../../../IndexPage/#Icon/CommonIcon.module.scss"
import { Icon, Grid, Toast } from "antd-mobile";
import { Page, TopBar, List, SelectDate, BasePicker, SwiperCard, ButtonPromise} from "component"
import {observer,inject} from "mobx-react"
import url from "url"
import { ajax } from "api";
import { NavLink,withRouter } from "react-router-dom";
import CreateOrderFormState from './CreateOrderForm.mobx.js'
import moment from "moment";
import storage from '../../../IndexPage/#Api/storage.js'
import Input from '../../../../page/BaseIput.jsx'


@withRouter
@observer class CreateOrderForm extends React.Component {
  render() {
    return (
      <Page>
        <List className={css.List}>
          <List.Justify icon={icons.MyMessage}>
            <div>{"收货方式"}</div>
            <div style={{ display: "flex" }}>
              <BasePicker
                relation='2'
                data={[
                    //  { value: 1, label: "快递配送" },
                     { value: 2, label: "门店自提" }
                ]}
                onChange={data => {
                  this.setState({ reciveType:data.keyvalue });
                  sessionStorage.setItem("reciveType", data.keyvalue);             
                }}
              ></BasePicker>
              <Icon type="right" color="#BDBAB4" size="md" />
            </div>
          </List.Justify>
          <List.Justify icon={icons.MyMessage}>
            <div>{"到店时间"}</div>
            <div style={{ display: "flex" }}>
              <SelectDate
                relation={new Date()}
                minDate={moment().toDate()}
                keyname="myDate"
                relation={this.state.SelectDate}
                onChange={this.handleSelectDate}
              />
              <Icon type="right" color="#BDBAB4" size="md" />
            </div>
          </List.Justify>
          <List.Vertical icon={icons.MyMessage} arrow={true} 
              >
            <div onClick={this.SelectTranslate.bind(this)}>
              <div>{this.state.PlatFormName}</div>
              <div>{this.state.TraslateName}</div>
           </div>
          </List.Vertical>
        </List>
        <List className={css.List} title={"商品列表"}>
          <List.Justify>
            <div
              style={{
                width: "60px",
                height: "60px",
                backgroundSize: "100% 100%",
                backgroundRepeat: "no-repeat",
                backgroundImage: `url(${this.store.ConvertInform.get(
                  "ImagesImageUrl"
                )})`
              }}
            />
            <div className={css.AutoBlock}>
              <div>{this.store.ConvertInform.get("Title")}</div>
              <div>{this.store.ConvertInform.get("AttributeDetailsName")}</div>
            </div>
            <div>
              <div style={{ color: "#1D8C1D" }}>{this.state.PayPoints}积分</div>
              <div style={{ color: "#1D8C1D",textAlign:'right' }}>{"X1"}</div>
            </div>
          </List.Justify>
        </List>
        <List className={css.List}>
          <List.Justify icon={icons.MyMessage}>
            <div>{"优惠券"}</div>
            <div style={{ color: "#1D8C1D" }}>{"0张优惠券"}</div>
          </List.Justify>
          <List.Justify icon={icons.MyMessage}>
            <div>{"优惠金额"}</div>
            <div style={{ color: "#1D8C1D" }}>{"￥0"}</div>
          </List.Justify>
          <List.Justify icon={icons.MyMessage}>
            <div>{"配送费用"}</div>
            <div style={{ color: "#1D8C1D" }}>{"￥0"}</div>
          </List.Justify>
          <List.Justify icon={icons.MyMessage}>
            <div>{"扣除积分"}</div>
            <div style={{ color: "#1D8C1D" }}>
              {this.store.ConvertInform.get('DeductIntegral')}
              积分
            </div>
          </List.Justify>
          <List.Justify>
            <div>{"订单实付金额"}</div>
            <div style={{ color: "#1D8C1D" }}>{"￥0"}</div>
          </List.Justify>
        </List>
        <List>
          <List.Justify className={css.save}>
            <div style={{width:'100%'}}>{"备注:"}
            <Input ref='saveText' value={this.state.remark || ''} onChange={this.remark.bind(this)} className={css.saveText} placeholder="给商家留言,对本次订单说明~"/></div>
          </List.Justify>
        </List>
        <Page.Bottom>
          <div className={css.Bottom}>
            <div className={css.PayNumber}>
              <span>{"实付款:"}</span>
              <span style={{ color: "#FF5050" }}>{this.state.PayPoints}</span>
              <span style={{ color: "#FF5050" }}>{"积分"}</span>
            </div>
            <ButtonPromise className={css.submit} 
            onClick={this.AddPayOrder.bind(this)} 
            theme={ButtonPromise.style.typeSave()}
          >
              {"提交订单"}
            </ButtonPromise>
            {/* <ButtonPromise className={css.submit} disable={true} > 
               <a onClick={this.AddPayOrder.bind(this)}>
              {"提交订单"}
                 </a>
            </ButtonPromise> */}
          </div>
        </Page.Bottom>
      </Page>
    );
  }
  constructor(props) {
    super(props);
    this.query = url.parse(this.props.location.search, true)["query"];
    this.store = new CreateOrderFormState(this.query);
    this.state = {
      reciveType: "2",
      SelectDate:'',
      PayPoints: "",
      remark:"",
      PlatFormName: storage.SeleteAdressInfo[0],
      TraslateName: storage.SeleteAdressInfo[1],
      PlatFormId: storage.SeleteAdressInfo[2],
      TraslateId: storage.SeleteAdressInfo[3],
      Province: storage.SeleteAdressInfo[4],
      City: storage.SeleteAdressInfo[5],
      Area: storage.SeleteAdressInfo[6], 
      TranslateAddress: storage.SeleteAdressInfo[7],
      SelectType: "快递配送",
  
    };
  }
  remark(e,value){
    this.setState({ remark:value})
  }
  SelectTranslate(){
    sessionStorage.setItem('reciveTime', this.state.SelectDate)
    sessionStorage.setItem("remark", this.state.remark || '');
    this.props.history.push("/PaymentProcessRouter/CreateOrderFormRouter/ApplicationStore?AccountId=" + this.query["AccountId"] + "&ProductId=" + this.query["ProductId"]);
  }
  // get toSelectTranslate() {
  //     return url.format({
  //     pathname: "/PaymentProcessRouter/CreateOrderFormRouter/ApplicationStore",
  //     query: {
  //       AccountId: this.query["AccountId"],
  //       ProductId: this.query["ProductId"]
  //     }
  //   });

  // }
  handleSelectDate = changeOBJ => {
   // console.log(changeOBJ);
    const { keyvalue } = changeOBJ;
    this.setState({ SelectDate: keyvalue });
  };
  async componentDidMount() {
    document.title = "添加订单"
    if (this.state.PlatFormName == undefined) {
      this.setState({ PlatFormName: storage.ApplicationStoreInfo.data[0].PlatFormName})
      this.setState({ TraslateName:storage.ApplicationStoreInfo.data[0].TraslateName})
      this.setState({ PlatFormId: storage.ApplicationStoreInfo.data[0].PlatFormId })
      this.setState({ TraslateId: storage.ApplicationStoreInfo.data[0].TraslateId })
      this.setState({ Province: storage.ApplicationStoreInfo.data[0].Province })
      this.setState({ City: storage.ApplicationStoreInfo.data[0].City });
      this.setState({ Area: storage.ApplicationStoreInfo.data[0].Area });
      this.setState({ TranslateAddress: storage.ApplicationStoreInfo.data[0].TranslateAddress });
    } if(!this.state.reciveTime){
      this.setState({ SelectDate: sessionStorage.reciveTime || '' });
    }
    if (!this.state.reciveType) {
      this.setState({ reciveType: sessionStorage.reciveType });
    }
    if (!this.state.remark) {
      this.refs.saveText.value = sessionStorage.remark;
      this.setState({ remark: this.refs.saveText.value });   
    }

    try {
      const result = await this.store.getCreateOrderFormList();
      let Points = Math.abs(this.store.ConvertInform.get("DeductIntegral"));
      this.setState({ PayPoints: Points });
    } catch (error) {
      throw error;
    }
  }
  async AddPayOrder() {
    // 生成订单
    let obj = Object.assign({}, this.state);
    this.setState({ ...obj });;
    if (!obj.SelectDate){
      Toast.info("到店时间未选择",.6)
    }
    try {
          const result = await ajax.post({
            url: "/api/Order/AddAsync",
            data: {
              accountId: this.query.AccountId,
              orderType: "1",
              reciveType: obj.reciveType,
              reciveTime: obj.SelectDate,
              platFormId: obj.PlatFormId,
              platFormName: obj.PlatFormName,
              translateId: obj.TraslateId,
              translateName: obj.TraslateName,
              attributeDetailsId: this.query.AttributeDetailsId,
              deductIntergral: this.store.ConvertInform.get("DeductIntegral"),
              number: "1",
              remark: obj.remark||'',
              province: obj.Province,
              city: obj.City,
              area:obj.Area,
              address: obj.TranslateAddress
            }
          });
          sessionStorage.removeItem('remark')
          sessionStorage.removeItem('reciveTime')
          sessionStorage.setItem('reciveTime', this.state.SelectDate)
         this.props.history.push("/PaymentProcessRouter/PaymentOrderFormRouter/PaymentOrderForm?ProductId="
          + this.query["ProductId"] + 
          "&OrderNo=" + 
          result.orderNo + 
          '&AccountId='
           + this.query['AccountId']+
          '&OpenId=' + localStorage.getItem('openId'));
        } catch (error) {
        throw error
    }
  }
}
export default CreateOrderForm