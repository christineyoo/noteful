import React, { Component } from "react";
import Sidebar from "./sidebar.js";

import "./main.css";

class Main extends Component {
  displayNotes = () => {
    const notesArray = this.props.notes;
    const formattedNotes = notesArray.map((note, i) => {
      return (
        <div className="note-card" key={i}>
          <h2>{note.name}</h2>
          <p>{note.content}</p>
          <button>Delete</button>
        </div>
      );
    });
    return formattedNotes;
  };
  render() {
    return (
      <>
        <Sidebar folders={this.props.folders} />
        <h1>Noteful</h1>
        {this.displayNotes()}
        <button>Add Note</button>
      </>
    );
  }
}

export default Main;
