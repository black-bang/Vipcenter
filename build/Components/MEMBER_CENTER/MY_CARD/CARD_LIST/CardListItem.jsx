import { Link } from 'react-router-dom'
import User from "../../../../static/card/user.png";
import No_user from "../../../../static/card/no_user.png";
import { Toast, WhiteSpace, WingBlank, Button } from "antd-mobile";
import url from "url";
import { withRouter } from "react-router-dom";

@withRouter
class CardListItem extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    return <div className="Cardlist">
        <div className="listTop">
          <div className="price">
            <em>￥</em>
            <span>999</span>
          </div>
          <div className="text">
            <h3>"玫瑰之约"直减券</h3>
            <p>玫瑰之约"全场满28888减999</p>
          </div>
        </div>
        <div className="listBottom">
          <p>2018.09.19-2018.09.20</p>
          <span onClick={this.toDatail.bind(this)}>{"去使用"}</span>
        </div>
      </div>;
  }
  toDatail() {
    this.props.history.push("/CardDatail?Id=" + this.props.Id);
  }
  async componentDidMount(){

  }
} 

export default CardListItem;