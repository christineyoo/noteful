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
    error: null,
  };

  componentDidMount() {
    // Fetches folder data
    fetch("http://localhost:9090/folders", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then((folderData) => this.setState({ folders: folderData }))
      .catch((error) => this.setState({ error }));

    // Fetches note data
    fetch("http://localhost:9090/notes", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then((noteData) => this.setState({ notes: noteData }))
      .catch((error) => this.setState({ error }));
  }

  renderNavBars = () => {
    return (
      <>
        <Route exact path="/" component={NavBar} />
        <Route exact path="/folder/:folderId" component={NavBar} />
        <Route exact path="/note/:noteId" component={NavBarForNote} />
      </>
    );
  };

  renderMainSections = () => {
    return (
      <>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/folder/:folderId" component={Folder} />
        <Route exact path="/note/:noteId" component={Note} />
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
