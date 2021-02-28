import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import dummyStore from "./dummy-store.js";
import ApiContext from "./ApiContext";
import MainPage from "./Main/MainPage";
import NavBar from "./NavBar/NavBar";
import NavBarForNote from "./NavBar/NavBarForNote";
import Folder from "./Folders/Folder";
import Note from "./Notes/Note";
import "./App.css";

class App extends Component {
  state = {
    folders: [],
    notes: [],
  };

  // fake data loading from API call
  componentDidMount() {
    setTimeout(() => this.setState(dummyStore), 600);
  }

  renderNavBars = () => {
    return (
      <>
        <Route
          exact
          path="/"
          // render={(props) => <NavBar {...props} state={this.state} />}
          component={NavBar}
        />
        <Route
          exact
          path="/folder/:folderId"
          render={(props) => <NavBar {...props} state={this.state} />}
        />
        <Route
          exact
          path="/note/:noteId"
          render={(props) => <NavBarForNote {...props} data={this.state} />}
        />
      </>
    );
  };

  renderMainSections = () => {
    return (
      <>
        <Route
          exact
          path="/"
          render={(props) => <MainPage {...props} state={this.state} />}
        />
        <Route
          exact
          path="/folder/:folderId"
          render={(props) => (
            <Folder
              {...props}
              state={this.state}
              folderOneId="b0715efe-ffaf-11e8-8eb2-f2801f1b9fd1"
              folderTwoId="b07161a6-ffaf-11e8-8eb2-f2801f1b9fd1"
              folderThreeId="b07162f0-ffaf-11e8-8eb2-f2801f1b9fd1"
            />
          )}
        />
        <Route
          exact
          path="/note/:noteId"
          render={(props) => <Note {...props} state={this.state} />}
        />
      </>
    );
  };

  render() {
    const contextValue = {
      folders: this.state.folders,
      notes: this.state.notes,
    };
    return (
      <div className="App">
        <header>
          <h1>
            <Link to="/">Noteful</Link>
          </h1>
        </header>
        <ApiContext.Provider value={contextValue}>
          <div className="main">
            <nav className="flex-1">{this.renderNavBars()}</nav>
            <main className="flex-4">{this.renderMainSections()}</main>
          </div>
        </ApiContext.Provider>
      </div>
    );
  }
}

export default App;
