import { Page, TopBar, List } from "component"
import './ConvertListItem.Item.scss'
import { Icon, Grid } from "antd-mobile";
import icons from "../../../../../IndexPage/#Icon/CommonIcon.module.scss";
// const ImageUrl = icons.MyMessage;
import { observer, inject } from "mobx-react";
import url from 'url';
import { withRouter } from "react-router-dom";
import Url from '../../../../../../../static/Order/completePic.png'


@withRouter
class ConvertListItem extends React.PureComponent {
  render() {
    return (
        <div className="Order_list">
        <div className="bgPic"style={{
          display: 'block',
          width: '180px',
          height: '180px',  
          margin: 'auto',
           marginTop: '45%',
        }} ><img src={Url} /></div>
        <div className="tipText" >{'暂无数据'}</div>
        </div>
    );
  }
  constructor(props) {
    super(props);
    this.query = url.parse(this.props.location.search,true)['query']
  }
 
}
export default ConvertListItem;