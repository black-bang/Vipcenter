import './Points.scss'
import url from "url"
import { ajax } from 'api'
import { withRouter} from "react-router-dom"

@withRouter
class Points extends React.Component{
    render(){
        return(
            <div className="Points">
                    <div className="Points_number">
                                <div className="number">
                                    <p>积分</p>
                                    <p>{this.state.pointsNumber ||'0'}</p>
                                </div>
                                  <div className="care" onClick={this.toLink.bind(this)}>积分明细</div>
                    </div>
                    <div className="squre"></div>
                    <div className="Points_inform">
                        <span>积分规则</span>
                        <div className="tab">
                        <table style={{ cellpadding:"0",cellspacing:"0"}}>
                                   <thead>
                                        <tr>
                                            <td>{'品类'}</td>
                                            <td>{'积分规则'}</td>
                                        </tr>
                                   </thead>
                                   <tbody>
                                       {this.state.dataTable.map((item,index)=>{
                                        return(
                                            <tr key={index}>
                                                <td>{item.CatalogName}</td>
                                                <td>消费10000元获得{item.CatalogScore}积分</td>
                                            </tr>
                                        )
                                    })
                                       }
                                       
                                   </tbody>
                                </table>
                                <p>积分可以用于积分商城进行实物商品兑换</p>
                        </div>
                    </div>
            </div>
        )

       
    }
    constructor(props) {
        super(props)
        this.query = url.parse(this.props.location.search, true)["query"]
        this.state={
            pointsNumber:'',
            dataTable:[]
        }
    }
    toLink(){
        this.props.history.push("/Convert?AccountId=" + this.query.AccountId + "&OpenId="+this.query.OpenId);
    }
    async componentDidMount(){
        document.title="积分查询"
        try{
            const result = await ajax.get({
                url:"/api/User_Account/User_IntegralListAsync/" ,
                data: { openId: this.query.OpenId}  
            })
           // console.log(result)
            this.setState({ pointsNumber: result.Effectiveintegral})
        }catch(error){
            throw error
        }
        try {
            const result = await ajax.get({
              url: "/api/Wx_Good_Catalog_Score/ListAsync/",
              data: { wx_SeetingId: "1" }
            });
            this.setState({dataTable:result})
        } catch (error) {
            throw error
        }
    }
}
export default Points;