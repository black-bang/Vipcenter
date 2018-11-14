import style from "./VIPInfoBar.module.scss"
import {Photo} from "component"
import storage from "../../#Api/storage.js"
import { withRouter } from 'react-router-dom'

@withRouter
export default class VIPInfoBar extends React.Component {
  render() {
    const {
      AccounId,
      Effectiveintegral,
      Mobile,
      Name,
      Picture,
      PlatFormName,
      VipLevel,
      VipNumber,
      CardName
    } = storage.VipInfo;

    return (
      <div className={style["VIPInfoBar"]}>
        <div className={style["VIPInfoBar-Top"]}>
          <div onClick={this.toMyRights.bind(this)}>
            <Photo size={75} src={Picture} />
          </div>
          <div className={style["VIPMessage"]}>
            <div className={style["Name"]}>{Name}</div>
            <div className={style["line"]} style={{width:'140px'}} />
            <div className={style["Mobile"]}>NO:{VipNumber}</div>
          </div>
        </div>
        <div className={style["VIPInfoBar-Bottom"]}>
          <div onClick={this.toLevel.bind(this)} className={style["Level"]}>
            <span>{"我的等级:"}</span>
            <span>{CardName}</span>
          </div>
          <div onClick={this.tomyPoints.bind(this)} className={style["Score"]}>
            <span>{"我的积分:"}</span>
            <span>{Effectiveintegral||'0'}分</span>
          </div>
        </div>
      </div>
    );
  }
async componentDidMount(){
  //window.addEventListener('touchmove', function (event) { event.preventDefault(); }, false)
}
  toMyRights(){
    this.props.history.push("./MyRights?AccountId=" + storage.VipInfo.AccountId + "&OpenId=" + localStorage.openId);
  }
  toLevel() {
	  this.props.history.push("./MyRights?AccountId=" + storage.VipInfo.AccountId + "&OpenId=" + localStorage.openId);
  }
  tomyPoints(){
    this.props.history.push('./Points?AccountId=' + storage.VipInfo['AccountId'] + "&OpenId=" + localStorage.openId + '&SeetingId=' + localStorage.SeetingId)
  }
}