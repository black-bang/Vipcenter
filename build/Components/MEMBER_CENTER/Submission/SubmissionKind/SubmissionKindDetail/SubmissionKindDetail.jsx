import { Page, TopBar, SelectRegion, Lable,List, SelectDate, BasePicker, SwiperCard, ButtonPromise } from "component"
import "./SubmissionKindDetail.scss";
import { Icon, Grid } from "antd-mobile";
import SubmissionDetaState from './SubmissionKindDetail.mobx.js'
import { observer,inject} from 'mobx-react'
import url from 'url'
import moment from 'moment'
import KindImg from './KindImg/KindImg.jsx'
import storage from "../../../IndexPage/#Api/storage.js";
import { Modal, Toast, WhiteSpace, WingBlank, Button } from "antd-mobile";

const alert = Modal.alert;
@observer
class SubmissionKindDetail extends React.Component {
  render() {
    const{
      GoodName,
      CostMoney,
      GoodType,
      BuyTime,
      TranslateName,
      Remark,
      Integral
    }=this.store.List
    return <Page className="AddBox">
        <List>
          <List.Justify arrow={false}>
            <div>{"商品名称"}</div>
            <div>{GoodName}</div>
          </List.Justify>
          <List.Justify arrow={false}>
            <div>{"消费金额(元)"}</div>
            <div>{CostMoney}</div>
          </List.Justify>
          <List.Justify arrow={false}>
            <div>{"商品类别"}</div>
            <div>{GoodType}</div>
          </List.Justify>
          <List.Justify arrow={false}>
            <div>{"购买日期"}</div>
            <div>{moment(BuyTime).format("YYYY-MM-DD")}</div>
          </List.Justify>
          <div className="Store">
            <div>{"购买门店"}</div>
            <div>{this.state.shopName}</div>
          </div>
          <div style={{width:'100%',height:'10px',background:'#EBEBEB'}}></div>
          <div className="Text">
            <span> {"备注:"}</span>
            <div className="Texted">
              {Remark || ''}
            </div>
          </div>
        <div style={{ width: '100%', height: '10px', background: '#EBEBEB' }}></div>
          <List.Justify arrow={false}>
            <div>{"上传凭证(多张)"}</div>
          </List.Justify>
          {/* <div className="PicList">
          <div className="ListItemWrap"><div className="ListItem" /></div>
          </div> */}
        <div className="PicList">
          {this.store.List.User_Evidence_Image.map((item, index) => {
            return <KindImg key={index} {...item}/>    
          })}
        </div>
        </List>
        <div className="InfoBox">
          <div style={this.ComputedStyle.a} className="TipInfom">
            <div className="SucceessText">
              <span>
                <Icon type="check-circle"  style={{marginTop:'3px'}} color="#03C235" size="md" />
              </span>
              <p>{"恭喜,该申请已通过"}</p>
            </div>
            <div className="SuccessOrder">获得{Integral}积分</div>
          </div>
          <div style={this.ComputedStyle.b} className="TipInfom">
            <div className="ErrText">
              <span>
                <Icon type="cross-circle-o" style={{marginTop:'3px'}} color="#FF0000" size="md" />
              </span>
              <p>{"抱歉,您的申请未通过"}</p>
            </div>
            {/* <div className="ErrOrder">
              {"原因:您的凭证已经提交过申请,请不要重复提交"}
            </div> */}
          </div>
          <div ref='btn' style={this.ComputedStyle.c} className="DateilBtn">
            <ButtonPromise  onClick={this.handleSave.bind(this)} active={this.submit}>
              {"取消申请"}
            </ButtonPromise>
          </div>
        </div>
      </Page>;
  }

  constructor(props) {
    super(props);
    this.query = url.parse(this.props.location.search, true)['query']
    this.store = new SubmissionDetaState(this.query)
    this.state = {
      shopName:''
    };
  }
  get ComputedStyle(){
    if (this.store.List.AuditState==0){
      return {
        a: { display: 'none' },
        b: { display: 'none' },
        c: { display: 'block' }
      }
    }
    if (this.store.List.AuditState == 1) {
      return {
        a: { display: 'block'},
        b: { display: 'none' },
        c: { display: 'none' }
      }
    }
    if (this.store.List.AuditState == 2) {
      return {
        a: { display: 'none' },
        b: { display: 'block' },
        c: { display: 'none' }
      }
    }
    return{
      a:{display:'none'},
      b:{display:'none'},
      c:{display:'none'}
    }
  }
  handleSave = async () => {
  alert('警告', '是否要取消提交凭证', [
      { text: '取消', onPress: () => console.log('cancel'), style: 'default' },
      { text: '确认', onPress: () => {
        try {
           this.store.updeteList()
           this.store.getDetaList();
           this.refs.btn.style.display = 'none'
         setTimeout(()=>{
           this.props.history.goBack();
         },1000)
        } catch(errow){
            throw error
        }
      } },
    ]);

  }
  async componentDidMount() {
    document.title = "凭证详情";
    Toast.loading('loading...', 30)
    try{
      const result = await this.store.getDetaList();
      //console.log(this.store.List.AuditState);
      Toast.hide();
      this.forceUpdate();    
    }catch(error){
        throw error
    }
    const formatData = storage.ApplicationStoreInfo.data.map(Item => {
      return { value: String(Item["TraslateId"]), label: Item["TraslateName"] };
    });
    const findResult = formatData.find(item => {
      return item.value == this.store.List.TranslateId;
    });
     //console.log(findResult.label);
    this.setState({ shopName: findResult.label})
  }




}

export default SubmissionKindDetail;
