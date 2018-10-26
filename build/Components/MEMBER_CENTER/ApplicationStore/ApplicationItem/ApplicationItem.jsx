import Map from "../../../../static/card/map.png";
import Tel from "../../../../static/card/tel.png";
import PositionLink from "./PositionLink.js";
import './ApplicationItem.scss'
import { Page, TopBar, List, SelectDate, BasePicker } from "component"
import SwiperCard from "../../../page/SwipeCard/SwipeCard.jsx";
import storage from '../../IndexPage/#Api/storage.js'
import { withRouter } from "react-router-dom";
import url from 'url';
import { Modal, Toast, WhiteSpace, WingBlank, Button } from "antd-mobile";

const alert = Modal.alert;
@withRouter
class ApplicationItem extends React.PureComponent {
  render() {
    return (
      // <SwiperCard>
      //   <SwiperCard.Content>
      <div className="list" onClick={this.SelectAddress.bind(this)}>
        <div className="storeAddress">
          <h3>{this.props.TraslateName}</h3>
          <p>
            <span>{this.props.TranslateAddress}</span>
            <em ref="toMapAddress" onClick={this.toMap.bind(this)}>
              <img ref='mapStae' src={Map} />
            </em>
          </p>
        </div>
        <div className="storeTel"  >
          <span>
            <a href={`tel:${this.props.Telephone}`} style={this.ComputedStyle}   >
              <img ref="picStae"  src={Tel} alt="" />
            </a>
          </span>
        </div>
      </div>
      //   {/* </SwiperCard.Content>
      //   <SwiperCard.ButtonGroup>
      //     <SwiperCard.ButtonGroup.Item onClick={this.onSelete.bind(this)}>
      //       {"选择"}
      //     </SwiperCard.ButtonGroup.Item>
      //   </SwiperCard.ButtonGroup>
      // </SwiperCard> */}
    );
  }
  constructor(props) {
    super(props);
    this.query = url.parse(this.props.location.search, true)["query"];
  }
  get ComputedStyle(){
    if (this.props.Telephone == 'null') {
      return { pointerEvents:'none',           
      }
    }
  }
  toMap() {
    let address = this.props.TranslateAddress;
    const string = [this.props.Lat, this.props.Lng, address];
    const position = new PositionLink(string);
    let map = position.link;
    window.location.href = map;
  }
  SelectAddress() {
    if (this.query["ProductId"]) {
    let SeleteAdress = [
      this.props.PlatFormName,
      this.props.TraslateName,
      this.props.PlatFormId,
      this.props.TraslateId,
      this.props.Province,
      this.props.City,
      this.props.Area,
      this.props.TranslateAddress
    ];
    console.log(SeleteAdress);
    storage.setSeleteAdressInfo(SeleteAdress);
      this.props.history.goBack();
    } else {

    }

    // alert("提示", "是否选择" + this.props.TraslateName + "为收货地址!", [
    //   {
    //     text: "否",
    //     onPress: () => console.log("cancel"),
    //     style: "default"
    //   },
    //   {
    //     text: "是",
    //     onPress: () => {
    //       let SeleteAdress = [
    //         this.props.PlatFormName,
    //         this.props.TraslateName,
    //         this.props.PlatFormId,
    //         this.props.TraslateId
    //       ];
    //       console.log(SeleteAdress);
    //       storage.setSeleteAdressInfo(SeleteAdress);
    //       if (this.query["ProductId"]) {
    //         this.props.history.goBack();
    //       } else {
    //         Toast.info("选择成功", 0.8);
    //       }
    //     }
    //   }
    // ]);
  }
  async componentDidMount(){
  //  console.log(this.props.Lat);
    if (this.props.Telephone == 'null'){
      this.refs.picStae.style.opacity='.3'
    }
      if (this.props.Lat == 'null'){
        this.refs.picStae.style.opacity = ".1";
        this.refs.toMapAddress.style.display = "none";
    }
  }
}
export default ApplicationItem;