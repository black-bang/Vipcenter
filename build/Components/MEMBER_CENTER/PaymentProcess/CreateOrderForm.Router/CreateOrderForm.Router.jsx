import CreateOrderForm from "./CreateOrderForm/CreateOrderForm.jsx"
import CreateOrderFormState from "./CreateOrderForm/CreateOrderForm.mobx.js"

import ApplicationStore from "../../ApplicationStore/ApplicationStore.jsx";

import {Route,Switch} from "react-router-dom"
import {Provider} from "mobx-react"



export default class CreateOrderFormRouter extends React.Component {
	render(){
		return (
		<Provider CreateOrderForm={this.CreateOrderForm}>
			<Switch>
				    <Route path="/PaymentProcessRouter/CreateOrderFormRouter/CreateOrderForm" component={CreateOrderForm}/>
					<Route path="/PaymentProcessRouter/CreateOrderFormRouter/ApplicationStore" component={ApplicationStore}/>
			</Switch>			
		</Provider>
	)}
	constructor(props){
	  	super(props);
	  	this.CreateOrderForm=new CreateOrderFormState()
	}
	
}