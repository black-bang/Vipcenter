
import SubmissionKind from './SubmissionKind/SubmissionKind.jsx'
import AddSubmission from "./SubmissionKind/AddSubmission/AddSubmission.jsx";
import SubmissionKindDetail from "./SubmissionKind/SubmissionKindDetail/SubmissionKindDetail.jsx";
import SubmissionResult from "./SubmissionKind/SubmissionResult/SubmissionResult.jsx";
import { Route, Switch } from "react-router-dom"
import { Provider } from "mobx-react"



export default class Submission extends React.Component {
    render() {
        return <Provider>
            <Switch>
              <Route path="/Submission/AddSubmission" component={AddSubmission} />
              <Route path="/Submission/SubmissionKindDetail" component={SubmissionKindDetail} />
              <Route path="/Submission/SubmissionResult" component={SubmissionResult} />
              <Route path="/Submission" component={SubmissionKind} />
            </Switch>
          </Provider>;
    }
    constructor(props) {
        super(props);
    }

}