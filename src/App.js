import React, { Component } from "react";
import { Route, Switch, Link } from "react-router-dom";
import Main from "./main.js";
import Folder from "./Folder.js";
import dummyStore from "./dummy-store.js";

import "./App.css";

class App extends Component {
  state = {
    notes: [],
    folders: [],
  };

  renderNavRoutes() {
    const { notes, folders } = this.state;
    return <></>;
  }
  render() {
    return (
      <div className="App">
        <nav className="App-nav"></nav>
        <header className="App-header">
          <h1>
            <Link to="/">Noteful</Link>
          </h1>
        </header>
        <main className="App-main"></main>
      </div>
    );
  }
}

export default App;
