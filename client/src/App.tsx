import React from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom';
import NavBar from "./components/NavBar";
import SignUpLogIn from "./pages/SignUpLogIn";
import Landing from "./pages/Landing";

type User = {
  username : string, 
  password ? : string
}

type AppProps = {
  className : string,
  user: User
}

class App extends React.Component<AppProps> {
  state = {
    user: this.props.user,
  };
  setUser = (user : User | null) => {
    this.setState({
      user: user,
    });
  };

  render() {
    return (
      <div className="container mx-auto font-mono">
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