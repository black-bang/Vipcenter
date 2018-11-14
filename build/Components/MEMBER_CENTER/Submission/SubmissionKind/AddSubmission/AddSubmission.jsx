import { Page, TopBar, SelectRegion, Lable,List, SelectDate, BasePicker, SwiperCard, ButtonPromise } from "component"
import Input from '../../../../page/BaseIput.jsx'
import EditInput from "../../../../page/EditInput/EditInput.jsx";
import './AddSubmission.scss'
import { inject, observer } from "mobx-react"
import storage from "../../../IndexPage/#Api/storage.js";
import AddSubmissionState from './AddSubmission.mobx.js'
import UpLoadFile from "../../../../page/UpLoad/UpLoadFile/UpLoadFile.jsx";
import url from 'url'
import { Toast, WhiteSpace, WingBlank, Button } from "antd-mobile";

@inject(stores => stores)
@observer
class AddSubmission extends React.Component {
  render() {
    const SubmissionDetail = this.store.Form;
    return (
      <Page className="AddBox" >
        <List>
          <List.Justify arrow={true}>
            <div>{"商品名称"}</div>
            <EditInput
              keyname="goodName"
              relation={SubmissionDetail["goodName"]}
              placeholder="请输入商品名称"
              onChange={this.handleNameChange}
            />
            {/* <Input
              onChange={this.handleChange.bind(this)}
              placeholder="请输入商品名称"
            /> */}
          </List.Justify>
          <List.Justify arrow={true}>
            <div>{"消费金额(元)"}</div>
            <EditInput
              keyname="costMoney"
              relation={SubmissionDetail["costMoney"]}
              placeholder="请输入金额"
              onChange={this.handleChange}
              onBlur={this.inputOnBlur }
         />
          </List.Justify>
          <List.Justify arrow={true}>
            <div>{"请选择商品类别"}</div>
            <BasePicker
              keyname={SubmissionDetail["CatalogName"]}
              relation={SubmissionDetail["Code"]}
              data={this.state.TypeList}
              onChange={this.handleChangeType}
            />
          </List.Justify>
          <List.Justify arrow={true}>
            <div>{"购买日期"}</div>
            <SelectDate
              keyname="buyTime"
              onChange={this.handleDataChange}
              maxDate={moment().toDate()}
              relation={SubmissionDetail["buyTime"]}
            /> 
          </List.Justify>
          <List.Justify arrow={true}>
            <div>{"购买门店"}</div>
            <BasePicker
              keyname={SubmissionDetail["TraslateName"]}
              relation={SubmissionDetail["TranslateId"]}
              data={this.state.dataList}
              onChange={this.handleChangeTraslate}
            />
          </List.Justify>
          <div style={{ width: '100%', height: '10px', background: '#EBEBEB' }}></div>
          <div className="saveText">
            <div style={{marginTop:'1px'}}> {"备注:"} </div>
              <EditInput
                keyname="remark"
                relation={SubmissionDetail["remark"]}
                placeholder="给商家留言,对本次订单说明~"
                onChange={this.handleSaveChange}
              />
          </div>
          <div style={{ width: '100%', height: '10px', background: '#EBEBEB'}}></div>
          <List.Justify arrow={false}>
            <div>{"上传凭证(多张)"}</div>
            <div />
          </List.Justify>
          <div className="SubmissonBox">
            <UpLoadFile MaxFile={3} store={this.store.UpLoadFileMC} />
          </div>
        </List>
        <Page.Bottom className="SubmitBtn">
          <ButtonPromise
            style={this.ComputedStyle}
            onClick={this.handleSave.bind(this)}
            active={this.submit}
          >
            {"提交"}
          </ButtonPromise>
        </Page.Bottom>
      </Page>
    );
  }

  constructor(props) {
    super(props);
    this.query = url.parse(this.props.location.search, true)['query']
    this.store = new AddSubmissionState(this.query);
    this.UpLoadFileMC = new UpLoadFile.MC();
    this.state = {
      dataList: [],
      TypeList: [],
      saveLable: "",
      flag:'0'
    };
  }
  get ComputedStyle(){
    if(this.state.flag ==1){
      return{
        display:'block',
        background:'green',
        color:'#fff'
      }
    }
  }
  async componentDidMount() {
    document.title = "上传凭证";
    const formatData = storage.ApplicationStoreInfo.data.map(Item => {
      return {
        value: String(Item["TraslateId"]),
        label: Item["TraslateName"]
      };
    });
    this.setState({ dataList: formatData });

    try {
      const result = await this.store.getcourentTypeList();
      //console.log(this.store.courentType);
      const typeData = this.store.courentType.map(Item => {
        return {
          value: String(Item["Code"]),
          label: Item["CatalogName"]
        };
      });
      this.setState({ TypeList: typeData })
    } catch (error) {}
  }
  handleNameChange = inputOBJ => {
    const { keyname, keyvalue } = inputOBJ;
    if (keyvalue.length >= 15) {
      return false
    }
    this.store.ChangeFormInfo(keyname, keyvalue);
  };
  handleSaveChange = inputOBJ => {
    const { keyname, keyvalue } = inputOBJ;
    if (keyvalue.length >= 36) {
      return false
    }
    this.store.ChangeFormInfo(keyname, keyvalue);
  };
  handleChange = inputOBJ => {
    const { keyname, keyvalue } = inputOBJ;
    if (keyvalue.length >= 8) {
      return false
    }
    let re = /^[0-9]*$/;
    if (re.test(keyvalue)) {
      this.store.ChangeFormInfo(keyname, keyvalue);
    } else {
      return false
    }
  };
  handleDataChange = inputOBJ => {
    const { keyname, keyvalue } = inputOBJ;
    this.store.ChangeFormInfo(keyname, keyvalue);
  };
  inputOnBlur = async () => {
    // await this.store.getcount();
  }
  handleChangeTraslate = (inputOBJ) => {
    const { keyname, keyvalue } = inputOBJ;
   // console.log(inputOBJ);
    //console.log(storage.ApplicationStoreInfo.data[0]);
    const formatData = storage.ApplicationStoreInfo.data.map(Item => {
      return { value: String(Item["TraslateId"]), label: Item["TraslateName"] };
    });
    const findResult = formatData.find(item => {
      //console.log(item)
      return item.value == keyvalue;
    });
   // console.log(findResult.label);
    this.store.ChangeFormInfo("translateName", findResult.label);
    this.store.ChangeFormInfo("translateId", keyvalue);
  };

  handleChangeType=inputOBJ=>{
    const { keyname, keyvalue } = inputOBJ;
    //console.log(inputOBJ);
    const formatData = this.store.courentType.map(Item => {
      return { value: String(Item["Code"]), label: Item["CatalogName"] };
    });
    const findResult = formatData.find(item => {
      return item.value == keyvalue;
    });
   // console.log(findResult.label);
    this.store.ChangeFormInfo("goodType", keyvalue);
  }
  get submit() {
    const{
      goodName,
      costMoney,
      goodType,
      buyTime,
      translateName,
      translateId
    } = this.store.Form
    const { hasFile } = this.store.UpLoadFileMC
      if (!goodName) {return false}
      if (!costMoney) { return false }
      if (!goodType) { return false }
      if (!buyTime) { return false }
      if (!translateName) { return false }
      if (!translateId) { return false }
      if(!hasFile){return false}
  }
  handleSave = async () => {
    Toast.loading('正在提交,请稍等~', 30)
    try { 
         await this.store.getAddSubmissionList()
           Toast.hide()
         this.props.history.replace('/Submission/SubmissionResult?OpenId='
         +this.query['OpenId']+
         '&AccountId='+this.query['AccountId'])
    } catch (error) {
      throw error;
    }

  };

//  async componentDidMount(){
//     try {
//     } catch (error) {
//       console.log(error);
//     }
//   }
}

export default AddSubmission;
