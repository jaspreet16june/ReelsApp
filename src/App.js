import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AuthProvider from "./AuthProvider";
import Home from "./component/Home";
import Login from "./component/Login";
function App() {
  return (
    // react fragment
    <AuthProvider>
        <Router>
        <Switch>
          <Route exact path="/Login">
            <Login />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </AuthProvider>
    
    
  );
}

export default App;