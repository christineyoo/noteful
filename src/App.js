import React, { Component } from "react";
import { Route, Switch, Link, NavLink } from "react-router-dom";
import dummyStore from "./dummy-store.js";
import MainPage from "./Main/MainPage";
import NavBar from "./NavBar/NavBar";
import "./App.css";

class App extends Component {
  state = {
    notes: [],
    folders: [],
  };

  // fake data loading from API call
  componentDidMount() {
    setTimeout(() => this.setState(dummyStore), 600);
  }

  // render navbar options

  // render all the notes

  render() {
    return (
      <div className="App">
        <nav>
          <Route
            path="/"
            render={(props) => <NavBar {...props} state={this.state} />}
          />
        </nav>
        <header>
          <h1>
            <Link to="/">Noteful</Link>
          </h1>
        </header>
        <main>
          <Route
            path="/"
            render={(props) => <MainPage {...props} state={this.state} />}
          />
        </main>
      </div>
    );
  }
}

export default App;
