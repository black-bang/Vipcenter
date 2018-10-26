import CreateOrderFormRouter from "./CreateOrderForm.Router/CreateOrderForm.Router.jsx"
import PaymentOrderFormRouter from "./PaymentOrderForm.Router/PaymentOrderForm.Router.jsx";
import PaymentOrderFormSuccessRouter from "./PaymentOrderFormSuccess.Router/PaymentOrderFormSuccess.Router.jsx";
import {Route,Switch} from "react-router-dom"

class PaymentProcessRouter extends React.Component {
	render(){
		return <Switch>
        <Route path="/PaymentProcessRouter/CreateOrderFormRouter" component={CreateOrderFormRouter} />
        <Route path="/PaymentProcessRouter/PaymentOrderFormRouter" component={PaymentOrderFormRouter} />
        <Route path="/PaymentProcessRouter/PaymentOrderFormSuccessRouter" component={PaymentOrderFormSuccessRouter} />
      </Switch>;}
}
export default PaymentProcessRouter