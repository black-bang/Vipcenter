// 积分兑换列表
import ConvertListItemForm from "./ConvertListForm.Router/ConvertListItem.Router/ConvertListItem.Router.jsx";
import { Route, Switch } from "react-router-dom"

class ConvertListRouter extends React.Component {
    render() {
        return <Switch>
            <Route path="/ConvertListRouter/ConvertList" component={ConvertListItemForm} />
          </Switch>;}
}

export default ConvertListRouter