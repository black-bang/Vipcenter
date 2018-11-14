import './KindImg.scss'
import { withFrame } from "api";
import { webview } from "api";

export default class KindImg extends React.PureComponent{
    render(){
        const{
            Credentialspicture
        }=this.props
        return(
            <div className="ListItemWrap" onClick={this.showImg.bind(this)}>
                <div className="ListItem" >
                    <img src={"http://jzkeyp.oss-cn-beijing.aliyuncs.com/" + Credentialspicture} alt="" />
                </div>
            </div>
        )
    }
    constructor(props){
        super(props)
    }
    showImg(){
        console.log(this.props.Credentialspicture)
        window.open("http://jzkeyp.oss-cn-beijing.aliyuncs.com/" + this.props.Credentialspicture, "_self", "width=300,heght=300px");
    }


}