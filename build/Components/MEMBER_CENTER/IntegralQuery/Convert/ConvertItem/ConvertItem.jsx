import "./ConvertItem.scss";
import url from "url";
import { ajax } from "api";
import moment from "moment";
import { Icon } from 'antd-mobile'
import ConvertItemChild from './ConvertItemChild/ConvertItemChild.jsx'
class ConvertItem extends React.PureComponent {
  render() {
    return (
        //<h1>{'111111'}</h1>
      <div className="Convert_List">
            {/* {this.props.map((item, k) => {
            console.log(item)
          return (
            <div key={k}> */}
              <div className='listTop' onClick={this.hideBtn.bind(this)}>
              <div className="dataTime"><span>{this.props.Month},</span>
            {this.props.Year}</div>
              <div style={this.ComputedStyle.a}  className='iconPic'><Icon type="right" color="#000" size="md" /></div>
              </div>
            <div style={this.ComputedStyle.b}>
            {this.props.Lists.map((List, index) => {
                return (
              
                        // {/* 用状态控制这个 div */}
                        // {/* {/*循环出ConvertItemChild *//} */}
                            < ConvertItemChild {...List} key={index} />
                          );
                        })}
             </div>
            </div>
        //   );
        // })}
    //   </div>
    );
  }

  constructor(props) {
    super(props);
    this.state = {
      dataIntegral: "",
      flag:'1'
    };
  }
    hideBtn(){
        if (this.state.flag == 1) {
            this.setState({flag:'0'})
        }else{
            this.setState({ flag: '1' })
        }
    }
    get ComputedStyle(){
        if(this.state.flag == 1){
            return{
              a: { transform: 'rotate(90deg)'},
              b: { display: 'block'}
            }
        }else{
           return{
             a: { transform: 'rotate(0)' },
             b: { display: 'none' }
           }
        }
    }
  componentDidMount() {
  }
}
export default ConvertItem;
