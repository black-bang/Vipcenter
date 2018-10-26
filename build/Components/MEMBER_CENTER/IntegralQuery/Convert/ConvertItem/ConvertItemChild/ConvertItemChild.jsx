import url from "url";
import { ajax } from "api";
import moment from "moment";
export default class ConvertItemChild extends React.PureComponent {
    render(){
        const {
            Id,
            Details,
            Integral,
            CreateTime,
        }=this.props
        return (
            <li>
                <div className="text">
                    <h4>{Details}</h4>
                    <p>
                        {moment(CreateTime).format("YYYY-MM-DD")}
                        <span>{moment(CreateTime).format("HH:mm")}</span>
                    </p>
                </div>
                <div className="points" ref='texState'>
                    {/* {Integral} */}
                    {this.state.dataIntegral}
                    积分
                    </div>
            </li>            
    )}

    constructor(props) {
        super(props);
        this.state = {
            dataIntegral: ""
        };
    }
 componentDidMount() {

              if (this.props.Integral > 0) {
              let Integral =this.props.Integral;
              this.setState({ dataIntegral: "+" + Integral });
              this.refs.texState.style.color = "green";
            } else {
              let Integrals = Math.abs(this.props.Integral);
              this.setState({ dataIntegral: "-" + Integrals });
              this.refs.texState.style.color = "red";
            }

  }

}
