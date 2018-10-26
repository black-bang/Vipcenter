import ConvertListItemFormRouter from "./ConvertListItem/ConvertListItem.Router.jsx";
import ConvertDatail from "./ConvertListItem/ConvertDatail/ConvertDatail.jsx"

import { Route, Switch } from "react-router-dom"
import { Provider } from "mobx-react"
import OrderListState from "./ConvertListItem/ConvertListItem.mobx.js";



export default class ConvertListItemForm extends React.Component {
  render() {
    return <Provider OrderListState={this.OrderListState}>
        <Switch>
          <Route path="/ConvertListRouter/ConvertList/ConvertListItemFormRouter/ConvertDatail" component={ConvertDatail} />
          <Route path="/ConvertListRouter/ConvertList/ConvertListItemFormRouter" component={ConvertListItemFormRouter}  />
        </Switch>
       </Provider>;
  }
  constructor(props) {
    super(props);
    this.OrderListState = new OrderListState();
  }
  

}