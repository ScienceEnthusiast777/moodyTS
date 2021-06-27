// import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { Route, Switch } from "react-router-dom";
import Restricted from "./components/Restricted";
import NavBar from "./components/NavBar";
import SignUpLogIn from "./pages/SignUpLogIn";
import Landing from "./pages/Landing";

class App extends React.Component {
  state = {
    user: this.props.user,
  };
  setUser = (user) => {
    this.setState({
      user: user,
    });
  };

  render() {
    return (
      <div className="App">
        <NavBar user={this.state.user} setUser={this.setUser} />
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => <Landing user={this.state.user} setUser={this.setUser} {...props} />}
          />
          <Route
            exact
            path="/signup"
            render={(props) => <SignUpLogIn user={this.state.user} setUser={this.setUser} {...props}/>}
          />
          <Route
            exact
            path="/login"
            render={(props) => <SignUpLogIn user={this.state.user} setUser={this.setUser} {...props}/>}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
