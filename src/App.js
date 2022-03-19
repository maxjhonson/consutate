import "bootstrap/dist/css/bootstrap.css";
import * as $ from "jquery/dist/jquery.js";
import "bootstrap/dist/js/bootstrap.js";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

//import Admin from "./components/administration/Admin";

import Custumer from "./components/custumer/Custumer";
import Admin from "./components/administration/Admin";
import TermsAndConditions from "./components/custumer/TermsAndConditions";

window.jQuery = $;
window.$ = $;
global.jQuery = $;

function App() {
  return (
    <Router>
      <Switch>
        <Route
          path="/"
          exact
          render={() => {
            return <Redirect to="/c" />;
          }}
        ></Route>
        <Route path="/c" component={Custumer}></Route>
        <Route path="/admin" component={Admin}></Route>
        <Route path="/terms" component={TermsAndConditions}></Route>
      </Switch>
    </Router>
  );
}

export default App;
