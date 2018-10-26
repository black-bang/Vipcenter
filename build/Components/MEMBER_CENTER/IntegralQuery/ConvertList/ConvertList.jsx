// 积分兑换列表
import './ConvertList.scss'
import { url  } from 'api';
import { Toast, WhiteSpace, WingBlank, Button } from "antd-mobile";
import { Tabs, Badge } from "antd-mobile";


const tabs = [
    { title: <Badge>全部</Badge> },
    { title: <Badge>待兑换</Badge> },
    { title: <Badge>待提货</Badge> },
    { title: <Badge>已完成</Badge> },
    { title: <Badge>退换</Badge> }
];
class ConvertList extends React.Component{
    render(){
        return(
            <div className="ConvertList">
                <Tabs
                    tabs={tabs}
                    initialPage={0}
                    onChange={(tab, index) => { }}
                    onTabClick={(tab, index) => { }}
                >
                </Tabs>
            </div>
        )
    }
}
export default ConvertList;