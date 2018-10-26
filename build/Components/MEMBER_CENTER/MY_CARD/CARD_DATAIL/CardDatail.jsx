import { ajax } from 'api';
import url from 'url';
import './cardDatail.scss'
import Map from "../../../../static/card/map.png";
import Tel from "../../../../static/card/tel.png";
import Bg from "../../../../static/card/datail_bg.png";
import { Toast, WhiteSpace, WingBlank, Button } from "antd-mobile";
window.wx = "https://res.wx.qq.com/open/js/jweixin-1.0.0.js";
class CartDatail extends React.Component {
    render() {
        return <div className="datail_content">
            {/* 优惠券信息 */}
            <div className="datail_top">
                <div className="inform_box" style={{ backgroundImage: `url(${Bg})` }}>
                <div className="storeinform">
                  <span />
                  <p>刘飞珠宝旗舰店</p>
                </div>
                <div className="card_inform">
                  <div className="top">
                    <div className="left">
                         <span>"玫瑰之约"直减券</span>
                         <p>2018.09.19-2018.09.20</p>
                    </div>
                    <div className="right">
                      <em>￥</em>
                      <span>999</span>
                    </div>
                  </div>
                {/* bottom */}
                    <div className="bottom">
                        <p>玫瑰之约"全场满28888减999</p>
                    </div>
                </div>
                {/* 优惠券二维码 */}
                <div className="card_pic">
                    <div className="top">
                            <div className="Qcard">
                            </div>
                    </div>
                    <div className="bottom">
                        <div className="card" ref="cardNumber">
                            2018  0920  0910
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
                        <h3>刘飞珠宝旗舰店</h3>
                        <p>
                            <span>镜湖新城公共服务中心中河路32号</span>
                            <em onClick={this.getMap.bind(this)}> <img src={Map} /></em>
                        </p>
                    </div>
                    <div className="storeTel">
                        <span><img src={Tel} alt=""/></span>
                    </div>
             </div>
             {/* 注意事项 */}
             <div className="notice">
                <h5>优惠券使用注意事项</h5>
                <p>1.本券不找零，不能兑换现金</p>
                <p>2.若申请对款，本券概不退换</p>
                <p>3.本公司对全保留最终解释权</p>
                <p>4.更多请阅读<span>《使用规则》</span></p>
             </div>
          </div>;
    }
    getMap(){

    }
    async componentDidMount(){
        document.title='卡券详情'
        Toast.loading("Loading...", .8, () => {
           // console.log("Load complete !!!");
        });
        let Cnumber = this.refs.cardNumber.innerHTML.replace(/(^\d{4}|\d{4}\B)/g, "$1 ")
        console.log(Cnumber)
    }
}

export default CartDatail;
