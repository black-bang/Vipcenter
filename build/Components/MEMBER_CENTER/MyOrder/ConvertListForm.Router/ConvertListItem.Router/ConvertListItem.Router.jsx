import ConvertListItemFormRouter from "./ConvertListItem/ConvertListItem.Router.jsx";
import ConvertDatail from "./ConvertDatail/ConvertDatail.jsx"

import { Route, Switch } from "react-router-dom"
import { Provider } from "mobx-react"



export default class ConvertListItemForm extends React.Component {
  render() {
    return <Provider>
        <Switch>
          <Route path="/MyOrderRouter/ConvertList/ConvertListItemFormRouter" component={ConvertListItemFormRouter} />
          <Route path="/MyOrderRouter/ConvertList/ConvertDatail" component={ConvertDatail} />
        </Switch>
      </Provider>;
  }
  constructor(props) {
    super(props);
  }

}