import './SubmissionKind.scss';
import { Page, TopBar, SelectRegion, Lable,List, SelectDate, BasePicker, SwiperCard, ButtonPromise } from "component"
import { Tabs, Badge } from "antd-mobile";
import SubmissionKindItem from "./SubmissionKindItem/SubmissionKindItem.jsx";
import ScrollView from "AppComponent/ScrollView/ScrollView.jsx";
import SubmissionKindState from './SubmissionKind.mobx.js'
import { observer, inject } from "mobx-react"
import { IndexRouter } from "react-router";
import url from 'url'
import Url from "../../../../static/Order/completePic.png";

const store = new SubmissionKindState();
@observer
class SubmissionKind extends React.Component {
  render() {
    const tabs = [
      { title: <Badge>全部<span>({this.store.ScrollViewState1.dataList.length || '0'})</span></Badge> },
      { title: <Badge>待审核<span>({this.store.ScrollViewState2.dataList.length || '0'})</span></Badge> },
      { title: <Badge>已审核<span>({this.store.ScrollViewState3.dataList.length || '0'})</span></Badge> }
    ];
    return <Page className='ListBox'>
          <div className='AddBtn' onClick={this.AddSubmission.bind(this)}>
              <span style={{ fontSize: "32px" }} >
                {"+"}
              </span>
          </div>
        <Tabs 
          tabs={tabs}
          initialPage={0} 
          onChange={this.onTab.bind(this)} 
          onTabClick={(tab, index) => { }}>
          <ScrollView store={this.store.ScrollViewState1}>
         <div style={{width:'100%',height:'auto',background:'#fff'}}>
            <div ref='hidePic1' style={{
              position: 'absolute',
              display: 'none',
              width: '180px',
              height: '180px',
              left: '0',
              right: '0',
              top: '0',
              bottom: '10%',
              margin: 'auto'
            }} ><img src={Url} /></div>
            {this.store.ScrollViewState1.dataList.map((item, index) => {
              return <SubmissionKindItem  {...item} key={index} />;
            })}
         </div>
          </ScrollView>
        <ScrollView store={this.store.ScrollViewState1}>
          <div style={{ width: '100%', height: 'auto', background: '#fff' }}>
            <div ref='hidePic2' style={{
              position: 'absolute',
              display: 'none',
              width: '180px',
              height: '180px',
              left: '0',
              right: '0',
              top: '0',
              bottom: '10%',
              margin: 'auto'
            }} ><img src={Url} /></div>
            {this.store.ScrollViewState2.dataList.map((item, index) => {
              return <SubmissionKindItem  {...item} key={index} />;
            })}
          </div>    
        </ScrollView>
        <ScrollView store={this.store.ScrollViewState1}>
          <div style={{ width: '100%', height: 'auto', background: '#fff'}}>
            <div ref='hidePic3' style={{
              position: 'absolute',
              display: 'none',
              width: '180px',
              height: '180px',
              left: '0',
              right: '0',
              top: '0',
              bottom: '10%',
              margin: 'auto'
            }} ><img src={Url} /></div>
            {this.store.ScrollViewState3.dataList.map((item, index) => {
              return <SubmissionKindItem  {...item} key={index} />;
            })}
          </div>
        </ScrollView>
        </Tabs>
        </Page>
  }
  constructor(props) {
    super(props);
    this.query = url.parse(this.props.location.search, true)['query']
    this.store = new SubmissionKindState(this.query);
  }
 async onTab(){
   if (this.store.ScrollViewState3.dataList.length == 0) {
     this.refs.hidePic3.style.display = 'block '
   }
   if (this.store.ScrollViewState1.dataList.length == 0) {
     this.refs.hidePic1.style.display = 'block'
   }
   if (this.store.ScrollViewState2.dataList.length == 0) {
     this.refs.hidePic2.style.display = 'block'
   }
  }
  async componentDidMount(){
     document.title ='我的凭证'
    try{
  setTimeout(()=>{
    if (this.store.ScrollViewState1.dataList.length == 0) {
      this.refs.hidePic1.style.display = "block";
    }
    if (this.store.ScrollViewState2.dataList.length == 0) {
      this.refs.hidePic2.style.display = 'block'
    }
  },750)
         const result = await this.store.getSubmissionKindList()
         const result_1 = await this.store.getSubmissionKindList_1()
         const result_2 = await this.store.getSubmissionKindList_2()
      if (this.store.ScrollViewState1.dataList.length > 0) {
        this.refs.hidePic1.style.display = 'none'
      }
      if (this.store.ScrollViewState2.dataList.length > 0) {
        this.refs.hidePic2.style.display = 'none'
      }
    }catch(error){
      throw error
    }
  }
  AddSubmission() {
    this.props.history.push("/Submission/AddSubmission?AccountId=" + this.query["AccountId"] +"&OpenId="+this.query["OpenId"]);
  }
}
export default SubmissionKind;
