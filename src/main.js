import React, { Component } from "react";
import "./main.css";

class Main extends Component {
  displayNotes = () => {
    const notesArray = this.props.notes.notes;
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
        <h1>Noteful</h1>
        {this.displayNotes()}
        <button>Add Note</button>
      </>
    );
  }
}

export default Main;
