import { ajax } from 'api';
import url from 'url';
import "./ConvertDatail.scss";
import Map from "../../../../../../static/card/map.png";
import Tel from "../../../../../../static/card/tel.png";
import Bg from "../../../../../../static/card/datail_bg.png";
import { Toast, WhiteSpace, WingBlank, Button } from "antd-mobile";
import PositionLink from '../../../../../page/PositionLink.js'
class ConvertDatail extends React.Component {
  render() {
    return <div className="datail_content">
        {/* 优惠券信息 */}
        <div className="datail_top">
          <div className="inform_box" style={{ backgroundImage: `url(${Bg})` }}>
            <div className="storeinform">
              <span style={{ backgroundImage: `url(${this.state.data})` }} />
              <p>{this.state.data.TranslateName}</p>
            </div>
            <div className="card_inform">
              <div className="top">
                <div className="left">
                  <span>{this.state.GoodTitle}</span>
                  <p>{this.state.Name}</p>
                </div>
                <div className="right">
                  <span>x{this.state.Number}</span>
                </div>
              </div>
            </div>
            {/* 优惠券二维码 */}
            <div className="card_pic">
              <div className="top">
                <div className="Qcard" />
              </div>
              <div className="bottom">
                <div className="card" ref="cardNumber">
                  {this.state.data.OrderNo}
                </div>
                <div className="tip">
                  <p>到店展示卡券，进行核销</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* =================================== */}
        {/* 门店地址 */}
        <div className="address">
          <div className="storeAddress">
            <h3>{this.state.data.TranslateName}</h3>
            <p>
              <span>{this.state.data.TranslateAddress}</span>
              <em onClick={this.getMap.bind(this)}>
                {" "}
                <img src={Map} />
              </em>
            </p>
          </div>
          <div className="storeTel">
            <span>
            <a href={`tel:${this.state.data.TranslateTelephone}`} style={this.ComputedStyle}>
                <img ref="picStae" src={Tel}  />
              </a>
            </span>
          </div>
        </div>
        {/* 注意事项 */}
        <div className="notice">
          <h5>订单提货注意事项</h5>
          <p>1.本券仅在指定门店才能提货。</p>
          <p>2.若申请退款，只返回对应积分，不折现</p>
          <p>3.本公司对全保留最终解释权</p>
          <p>
            4.更多请阅读
            <span>《使用规则》</span>
          </p>
        </div>
      </div>;
  }
  constructor(props){
            super(props)
            this.query = url.parse(this.props.location.search,true)['query']
            this.state={
              data:[],
              GoodTitle:'',
              ImageUrl:'',
              Name:'',
              Number:''
            }
  }
  get ComputedStyle() {
    if (this.state.data.TranslateTelephone == "null") {
      return { pointerEvents: "none" };
    }
  }
  getMap() {
    let address = this.state.data.TranslateAddress;
    const string = [this.state.data.Lat, this.state.data.Lng, address];
    const position = new PositionLink(string);
    let map = position.link;
    window.location.href = map;
  }
  async componentDidMount() {
    document.title = "订单详情";
    
    Toast.loading("Loading...", 0.8, () => {
      // console.log("Load complete !!!");
    });
    let Cnumber = this.refs.cardNumber.innerHTML.replace(
      /(^\d{4}|\d{4}\B)/g,
      "$1 "
    );

    try{
      const result = await ajax.get({
            url:'/api/Order/ModelAsync',
            data: { orderNo: this.query['OrderNo']}
      })
      this.setState({data:result})
      this.setState({ Name: result.GoodList[0].Name });
      this.setState({ GoodTitle: result.GoodList[0].GoodTitle });
      this.setState({ ImageUrl: result.GoodList[0].ImageUrl });
      this.setState({ Number: result.GoodList[0].Number });
      console.log(result);
      if (result.TranslateTelephone == "null") {
        this.refs.picStae.style.opacity = ".3";
      }
    }catch(error){
      throw error
    }
  }
}

export default ConvertDatail;
