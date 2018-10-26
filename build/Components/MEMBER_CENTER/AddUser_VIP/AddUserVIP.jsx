import "./AddUserVIP.scss";
import url from 'url'
import { ajax } from 'api'
import Input from "../../page/BaseIput.jsx";
import { Modal, Toast, WhiteSpace, WingBlank, Button } from "antd-mobile";
const alert = Modal.alert;
class AddUserVIP extends React.Component {
  render() {
    return (
      <div className="Number">
        <div className="tota">
          <p>请输入手机号进行会员卡激活</p>
        </div>
        <div className="number">
          <span>+86</span>
          <Input
            // className={style["phoneNumber"]}
            placeholder="请输入手机号"
            value={this.state.Phonevalue}
            onChange={this.PhoneState.bind(this)}
          />
        </div>
        <div className="num-State">
          <div>{this.state.tipText}</div>
        </div>
        <div className="code">
          <span />
          <Input
            placeholder="请输入验证码"
            value={this.state.Codevalue}
            onChange={this.CodeState.bind(this)}
          />
          <button ref="btns" style={this.ComputedStyle.b} onClick={this.codeBtn.bind(this)}>{this.state.message}</button>
        </div>
        <div className="num-State">
          <div>{this.state.codeTip}</div>
        </div>
        <button
          disabled={this.state.btnState}
          className="nextBtn"
          onClick={this.activeBtn.bind(this)}
          style={this.ComputedStyle.a
          }
          ref="confirBtn"
        >
          立即激活
        </button>
      </div>
    );
  }
  constructor(props) {
    super(props);
    this.query = url.parse(this.props.location.search, true)["query"];
    this.state = { 
                tipText: "",
                Phonevalue: "",
                btnState: false,
                Codevalue: "", 
                codeTip: "" ,
                message:'免费获取短信验证码',
    };
  }
  async codeBtn() {
    let obj = Object.assign({}, this.state);
    let res = /^1\d{10}$/;
    if (res.test(obj.Phonevalue)) {
     
      // try {
      //   const res = await ajax.get({
      //     url: "/api/User_Account/IsExistCustomerMobileAsync/",
      //     data: { accountId: this.query.accountId, mobile: obj.Phonevalue }
      //   });
        try {
          const result = await ajax.post({
            url: "/api/User_Account/SendLoginMobileVerifyCode/",
            data: { mobile: this.state.Phonevalue }
          });

          let time = 60;
          let timer = setInterval(() => {
            time--;
            this.setState({ message: '请输入短信验证码' + "(" + time + "s" + ")" })
            this.refs.btns.disabled = true
            if (time == 0) {
              this.setState({ message: '重新获取验证码' })
              this.refs.btns.disabled = false
              clearInterval(timer);
            }
          }, 1000);
          this.setState({ ...obj });
          Toast.info("发送验证码成功", 0.6);    
        } catch (error) {
          throw error;
        }
      // } catch (error) {
      //   if (error == "手机号已经在该平台绑定,请重新输入!操作失败") {
      //     alert("提示", "手机号已经绑定! 请重新输入");
      //   } else {
      //     throw error;
      //   }
      // }
    } else {
      Toast.info("手机号格式不正确，或者为空", 0.6);
    }
  }
  // 激活会员卡按钮
  async activeBtn() {
    console.log(this.state.Phonevalue);
    if (this.state.Codevalue.length == 4 && this.state.Phonevalue.length == 11) {
        try {
          const result = await ajax.post({
            url: "/api/User_Account/AddUser_VIPAsync/",
            data: {
              openId: this.query.openId,
              vipNumber: this.state.Phonevalue,
              validCode: this.state.Codevalue,
            }
          });
   
          Toast.info("激活成功", 0.6);
          this.props.history.goBack();
        } catch (error) {
          Toast.info(error, 0.6);
        }
    } else {
      Toast.info("请输入正确的手机号,或验证码不能为空", 0.6);
    }
  }
  get ComputedStyle() {
    let res = /^1\d{10}$/;
    if (res.test(this.state.Phonevalue)) {
      return {
        a: { backgroundColor:"#1AAE15" },
        b: { color: "#1AAE15" }
      };
    } else {
      return {
        a: { backgroundColor: "#BCBCBC" },
        b: { color: "#BCBCBC" }
      };
    }
    if (this.state.Codevalue.length == 4){
      console.log(this.state.Codevalue);
    }
  }
  async componentDidMount() {
    document.title = "激活会员卡";
  }
  PhoneState(e, value) {
    this.setState({ Phonevalue: value });
    //console.log(this.state.Phonevalue);
  }
  CodeState(e, value) {
    this.setState({ Codevalue: value });
    //console.log(this.state.Codevalue);
  }
  componentWillUpdate(nextProps, nextState) {
    let res = /^1\d{10}$/;
    if (res.test(nextState.Phonevalue)) {
      nextState.tipText = "";
      this.refs.btns.disabled = false
      if (nextState.Codevalue.length == 4) {
        nextState.codeTip = "";
      } else {
        nextState.codeTip = "请输入正确的验证码";
      }
    } else {
      nextState.tipText = "请输入正确的手机号";
    } 
  }
}
export default AddUserVIP;
