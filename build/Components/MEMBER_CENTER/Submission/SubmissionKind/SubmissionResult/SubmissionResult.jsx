import { Page, TopBar, SelectRegion, Lable,List, SelectDate, BasePicker, SwiperCard, ButtonPromise } from "component"
import './SubmissionResult.scss'
import { Icon, Grid } from "antd-mobile";
import url from "url";

class SubmissionResult extends React.Component{
    render(){
        return <Page>
      
              <div className="topText">
                <span style={{marginTop:'6px'}}><Icon type="check-circle" color="#1AAE15" size="md" /></span>
                <p>{"提交成功,请等待审核"}</p>
              </div>

           <div className='BtnBox'>
            <Page.Bottom className="Contued Btn">
              <div onClick={this.Contued.bind(this)}>{"继续提交"}</div>
            </Page.Bottom>
            <Page.Bottom className="cancel Btn">
              <div onClick={this.cancel.bind(this)}>{"取消"}</div>
            </Page.Bottom>
           </div>
          </Page>;
    }

    constructor(props){
        super(props)
        this.query = url.parse(this.props.location.search, true)['query']

    }
    Contued(){
      this.props.history.replace('/Submission/AddSubmission?OpenId='
        + this.query['OpenId'] +
        '&AccountId=' + this.query['AccountId']);
    }
    cancel(){
      this.props.history.replace('/Submission?OpenId='
        + this.query['OpenId'] +
        '&AccountId=' + this.query['AccountId']);
    }
    componentDidMount(){
      document.title='提交结果'
    }
}

export default SubmissionResult;