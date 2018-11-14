import './SubmissionKindItem.scss'
import { withRouter } from 'react-router-dom'

@withRouter
export default class SubmissionKindItem extends React.PureComponent{
    render(){
        const{
            GoodName,
            CostMoney,
            Comment
        }=this.props
        return(
         <div>
                <div className="List" onClick={this.info.bind(this)} style={this.ComputedStyle.c}>
                    <div>
                        <div className='Texttitle'>{GoodName}</div>
                        <div style={this.ComputedStyle.a} className='order'>{this.state.order}</div>
                    </div>
                    <div style={this.ComputedStyle.b} className='orderState'>{this.state.orderState || ''}</div>
                </div>
         </div>
        )
    }
    constructor(props){
        super(props)
        this.state={
            order:'',
            orderState:''
        }
    }
    get ComputedStyle(){
            if (this.props.AuditState == 1) {
                return {
                    a: { color: '#08b014' },
                    b: { color: '#08b014' }
                }
            }
            if(this.props.AuditState == 2){
                return{
                    a: { color: '#FD1D12'},
                    b: { color: '#FD1D12'}
                }
            }
            if (this.props.AuditState == 3) {
                return {
                    a: { color: '#FF8B17' },
                    b: { color: '#FF8B17' },
                    c: { display: 'none' }    
                }
            }
        return {
            a: { color: '#08b014' },
            b: { color: '#08b014' },
        }
 
    }
    componentDidMount(){
        if (this.props.AuditState == 0) {
            this.setState({ order:  this.props.comment ||'' })
            this.setState({ orderState: '待审核' })
        }
        if (this.props.AuditState==1){
            this.setState({ order: '通过:'+'+' + this.props.Integral+'分'})
            // this.setState({ orderState: '已通过' })
        }
        if (this.props.AuditState == 2) {
            this.setState({ order: '拒绝原因:'+ this.props.Comment ||'' })
            // this.setState({ orderState: '已拒绝' })
        }
        if (this.props.AuditState == 3) {
            this.setState({ order:'' })
            this.setState({ orderState: '已取消' })
        }
    }
    info() {
        this.props.history.push("/Submission/SubmissionKindDetail?OpenId=" + localStorage.getItem("openId") + "&Id=" + this.props.Id);
    }
}