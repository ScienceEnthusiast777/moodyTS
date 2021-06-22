import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { Route, Switch } from "react-router-dom";
import Restricted from "./components/Restricted"
import NavBar from "./components/NavBar"

class App extends React.Component {
  state = {
    user: this.props.user,
  };
  setUser = (user) => {
    this.setState({
      user: user,
    });
  };

  render(){
    return(
      <div className="App">
        <NavBar/>
      </div>
    )
  }
}

export default App;
