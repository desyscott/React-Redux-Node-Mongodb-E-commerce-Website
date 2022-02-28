import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignUp from "./components/SignUp/SignUp";
import Login from "./components/SignIn/Login";
import Home from "./components/Home";
import Welcome from "./components/Welcome";
import EmailVerified from "./components/EmailVerified";
import ForgotPassword from "./components/Forgot-Password/ForgotPassword";
import ResetPassword from "./components/Reset-Password/ResetPassword";

function App() {
  // const user=localStorage.getItem("token")
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Welcome} />
          <Route path="/signUp" exact component={SignUp} />
          <Route path="/login" component={Login} />
          <Route
            path="/email-verification/:userId/:uniqueString"
            component={EmailVerified}
          />
          <Route path="/forgot-password" component={ForgotPassword} />
          <Route path="/reset-password" component={ResetPassword} />
          <Route path="/home" component={Home} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
