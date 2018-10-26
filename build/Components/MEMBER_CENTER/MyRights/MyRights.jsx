// 我的权益
import './MyRights.scss'
import url from 'url'
import { ajax } from 'api'
import { Modal, Toast, WhiteSpace, WingBlank, Button } from "antd-mobile";

const alert = Modal.alert;

class MyRights extends React.Component{
    render(){
        return <div className="myRights_cnotent">
            <div className="bankCard">
              <div className="bankCard_texts">
              <h1>{this.state.data.CardName}</h1>
              <span>{"卡号:"}{this.state.data.VipNumber}
                  <em>
                    <span></span>
                  </em>
              </span>
              </div>
            <p>{this.state.TranslateList}</p>
            </div>
            <div className="mumberRights">
              <h1>【会员权益】</h1>
              <div className="cardInform">
                <table style={{ cellpadding: "0", cellspacing: "0" }}>
                  <thead>
                    <tr>
                      <td>{"会员权益"}</td>
                      <td>{"金卡"}</td>
                      <td>{" 钻卡"}</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{"入会标准"}</td>
                      <td>{"素金15000/镶金6000"}</td>
                      <td>{"素金30000/镶金10000"}</td>
                    </tr>
                     <tr>
                      <td>{"晋升梯度"}</td>
                      <td>{"白银卡累计消费2次"}</td>
                      <td>{"金卡累计消费2次"}</td>
                    </tr>
                    <tr>
                      <td>{"会员专属优惠"}</td>
                      <td>{"素金类详见95折"}</td>
                      <td>{"素金类详见88折"}</td>
                    </tr>
                    <tr>
                      <td>{"会员积分累计"}</td>
                      <td>{"详见《积分规则》"}</td>
                      <td>{"详见《积分规则》"}</td>
                    </tr>
                    <tr>
                      <td>{"会员积分兑礼品"}</td>
                      <td>{"积分兑换礼品"}</td>
                      <td>{"积分兑换礼品"}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="useCard">
              <h1>【会员卡使用须知】</h1>
              <p>
                1.入会/累计消费仅限在制定门店发生的消费。系统自动累计，达到升级标准后，系统自动升级并推送消息告知会员升级成功。
              </p>
              <p>
                2.会员付款前，须主动提供卡号，手机号码，门店员工验证成功后可享受会员优惠;积分录入以实付金额部分为准,特殊商品,特价商品不参与优惠，但可积分特殊商品，特殊活动期间，以当地门店公告或通知为准。
              </p>
              <p>
                3.积分仅限在同一张卡上累计，兑换，不转让，不兑现。若会员使用VIP卡发生退货时，我们将对VIP卡内积分进行相应增减。
              </p>
              <p>
                4.积分显示仅供参考，具体以门店会员系统实际查询数据为准。
              </p>
              <p>
                5.线上积分返利/兑换为每年11月1日-11月30日，平时不予兑换。
              </p>
              <p>
                6.积分有效期为两年，到期前请配合门店通知进行续卡操作，逾期积分将被自动扣除，不做另行通知。
              </p>
              <p>
                7.持卡人如因信息变动未及时更新而影响其正常享受权益，本公司不承担任何责任，信息变更请至微信公众平台会员中心修改操作。
              </p>
              <p>
                8.此会员政策适用于本手册发放门店使用，详见末页。详情咨询门店或致电4000211848（工作日9:30-16:30）
              </p>
              <h1>【线上会员兑换】</h1>
              <p>
                1.兑换申请提交经后审核查过后，礼品到货第一时间通知会员到店领取
              </p>
              <p>2.图片仅仅供参考，礼品以实物为准。</p>
              <p>3.礼品兑换成功后，非礼品本身质量问题，不予退换。</p>
              <p>
                4.礼品如有多种颜色将随机发货，礼品实际效果以实物为准。
              </p>
            </div>
          </div>;
    }
  constructor(props) {
    super(props)
    this.query = url.parse(this.props.location.search, true)['query']
    this.state = {
      data:[],
      TranslateList:''
    }
  }
  async componentDidMount() {
    document.title = "我的权益"
    try{
         const result = await ajax.get({
           url: "/api/User_Account/User_IntegralListAsync",
           data: { openId: this.query.OpenId }
         });
         //console.log(result)
         this.setState({ TranslateList: result.PlatFormName})
         this.setState({data:result})
      if (result == '请激活会员卡'){
        // alert("请激活会员卡!", "是否立即激活", [
        //   {
        //     text: "稍后",
        //     onPress: () => console.log("cancel"),
        //     style: "default"
        //   },
        //   {
        //     text: "是",
        //     onPress: () =>
        //       this.props.history.push("/AddUserVIP?openId=" + this.query.openId)
        //   }
        // ]);
      }
    }catch(error){
      throw error
    }
  }
} 
export default MyRights