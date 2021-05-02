import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import ApiContext from "./ApiContext";
import MainPage from "./Main/MainPage";
import NavBar from "./NavBar/NavBar";
import NavBarForNote from "./NavBar/NavBarForNote";
import Folder from "./Folders/Folder";
import Note from "./Notes/Note";
import AddFolder from "./AddFolder/AddFolder";
import AddNote from "./AddNote/AddNote";
import NotefulError from "./NotefulError";
import "./App.css";

class App extends Component {
  state = {
    folders: [],
    notes: [],
    error: null,
  };

  // Must "npm start" noteful-json-server to get posts
  componentDidMount() {
    // Fetches folder data
    fetch("http://localhost:8000/api/folders", {
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
    fetch("http://localhost:8000/api/notes", {
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

  // Responsible for adding a folder to the state
  addFolder = (data, folder_name) => {
    const newFolderObject = {
      id: data.id,
      folder_name: folder_name,
    };
    this.setState({ folders: [...this.state.folders, newFolderObject] });
  };

  // Responsible for adding a note to the state
  addNote = (data, noteName, noteContent) => {
    const newNoteObject = {
      id: data.id,
      name: noteName,
      content: noteContent,
    };
    this.setState({ notes: [...this.state.notes, newNoteObject] });
  };

  // Responsible for deleting a note from the state
  deleteNote = (noteId) => {
    const newNotes = this.state.notes.filter((note) => note.id !== noteId);
    this.setState({ notes: newNotes });
  };

  // Renders all the Routes for the NavBars
  renderNavBars = () => {
    return (
      <>
        <Route exact path="/" component={NavBar} />
        <Route exact path="/folder/:folderId" component={NavBar} />
        <Route exact path="/note/:noteId" component={NavBarForNote} />
      </>
    );
  };

  // Renders all the Routes for the main post sections
  renderMainSections = () => {
    return (
      <>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/folder/:folderId" component={Folder} />
        <Route path="/addFolder" component={AddFolder} />
        <Route path="/addNote" component={AddNote} />

        <Route exact path="/note/:noteId" component={Note} />
      </>
    );
  };

  render() {
    const contextValue = {
      folders: this.state.folders,
      notes: this.state.notes,
      deleteNote: this.deleteNote,
      addFolder: this.addFolder,
      addNote: this.addNote,
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
            <NotefulError>
              <nav className="flex-1">{this.renderNavBars()}</nav>
            </NotefulError>
            <NotefulError>
              <main className="flex-4">{this.renderMainSections()}</main>
            </NotefulError>
          </div>
        </ApiContext.Provider>
      </div>
    );
  }
}

export default App;
