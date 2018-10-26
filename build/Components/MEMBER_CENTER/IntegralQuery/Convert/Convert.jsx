import "./Convert.scss";
import url from "url";
import { ajax } from "api";
import moment from "moment";
import QueueAnim from "rc-queue-anim";
import ConvertState from './Convert.mobx.js'
import { observer } from "mobx-react";
import ConvertItem from "./ConvertItem/ConvertItem.jsx";
import { Modal, Toast, WhiteSpace, WingBlank, Button } from "antd-mobile";
import { withRouter } from "react-router-dom"
import ScrollView from "AppComponent/ScrollView/ScrollView.jsx";
import Url from '../../../../static/Order/completePic.png'

const alert = Modal.alert;

@withRouter
@observer
class Convert extends React.Component {
  render() {
    return (
      <div className="convert" >
        <ScrollView store={this.store.ScrollViewState}>
          <div className="bgPic" ref='hidePic' style={{
            position: 'absolute',
            display:'none',
            width:'180px',
            height:'180px',
            left: '0',
            right: '0',
            top: '0',
            bottom: '10%',
            margin: 'auto'
          }} ><img src={Url} /></div>
            {this.store.ScrollViewState.dataList.map((item, k) => {
            return (
              <ConvertItem {...item} key={k} />   
         
            )
          })}
          </ScrollView>
      </div>
    )
  }
  constructor(props) {
    super(props);
    this.query = url.parse(this.props.location.search, true)["query"];
    this.store = new ConvertState(this.query);
    this.state = {
      data: [],
      flag:'1'
      
    };
  }
  hideBtn(k){
    console.log(k)
    if (this.state.flag == 1) {
      this.setState({ flag: '0' })

    }else{
      this.setState({ flag: '1' })

    }
    
  }
  // get ComputedStyle(){
  //   if (this.state.flag == 1){
  //     return{
  //       display:'block'
  //     }
  //   }else{
  //     return {
  //       display: 'none'
  //     }
  //   }
  // }
  reLoad(){
    this.props.history.go()
  }
  reBack() {
    this.props.history.goBack(-1)
  }
  async componentDidMount() {
    document.title = "兑换记录";
    try {
      const result = await this.store.getConvertList();
    //  console.log(this.store.ScrollViewState.dataList)
      const listLength = await this.store.ScrollViewState.dataList.length;
      if (listLength > 0) {
      } else {
              this.refs.hidePic.style.display = "block";
      }
    } catch (error) {
      throw error;
    }
  }
}
export default Convert;
