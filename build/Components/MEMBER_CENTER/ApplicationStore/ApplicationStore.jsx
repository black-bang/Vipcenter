// 适用门店
import "./ApplicationStore.scss";
import url from "url";
import { ajax } from "api";
import QueueAnim from "rc-queue-anim";
import ApplicationItem from "./ApplicationItem/ApplicationItem.jsx";
import storage from '../IndexPage/#Api/storage.js'
import ApplicationStoreState from './ApplicationStore.mobx.js'
import Url from '../../../static/Order/completePic.png'
import ScrollView from "AppComponent/ScrollView/ScrollView.jsx";
import { observer } from "mobx-react";

@observer
class ApplicationStore extends React.Component {
  render() {
    return (
      <div className="cnotent">
           <ScrollView store={this.store.ScrollViewState}>
          <div className="bgPic" ref='hidePic5' style={{
            position: 'absolute',
            display: 'none',
            width: '180px',
            height: '180px',
            left: '0',
            right: '0',
            top: '0',
            bottom: '0',
            zIndex: '1',
            margin: 'auto'
          }} ><img src={Url} /></div>
          {this.store.ScrollViewState.dataList.map((item, index) => {
            return <ApplicationItem {...item}
              key={index}
            >
            </ApplicationItem>;
          })}  
           </ScrollView>
      </div>
    );
  }
  constructor(props) {
    super(props);
    this.query = url.parse(this.props.location.search, true)["query"];
    this.store = new ApplicationStoreState(this.query);
    this.state = {
      data: []
    };
  }


  async componentDidMount() {
    document.title = "适用门店";
    try {
      await this.store.getApplicationStoreList()
     // console.log(this.store.ScrollViewState.dataList)
    } catch (error) {
      throw error
    }
  }
}
export default ApplicationStore;