import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import dummyStore from "./dummy-store.js";
import MainPage from "./Main/MainPage";
import NavBar from "./NavBar/NavBar";
import FolderOne from "./Folders/FolderOne";
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
        <header>
          <h1>
            <Link to="/">Noteful</Link>
          </h1>
        </header>
        <nav className="flex-1">
          <Route
            exact
            path="/"
            render={(props) => <NavBar {...props} state={this.state} />}
          />
        </nav>
        <main className="flex-4">
          <Route
            exact
            path="/"
            render={(props) => <MainPage {...props} state={this.state} />}
          />
          <Route
            exact
            path="/folder/:folderId"
            render={(props) => (
              <FolderOne
                {...props}
                state={this.state}
                folderOneId="b0715efe-ffaf-11e8-8eb2-f2801f1b9fd1"
                folderTwoId="b07161a6-ffaf-11e8-8eb2-f2801f1b9fd1"
                folderThreeId="b07162f0-ffaf-11e8-8eb2-f2801f1b9fd1"
              />
            )}
          />
        </main>
      </div>
    );
  }
}

export default App;
