import React, { Component } from "react";
import ApiContext from "../ApiContext";

class Note extends Component {
  static contextType = ApiContext;

  // This function should display the note that the user selected with the content showing.
  displayNote = () => {
    const copyNotes = this.context.notes || [];
    const filteredNote = copyNotes.filter(
      (note) => note.id === this.props.match.params.noteId
    );
    const formattedFilteredNote = filteredNote.map((note, i) => {
      return (
        <div key={i} className="note-card">
          <h2>{note.name}</h2>
          <p>Date modified on {note.modified}</p>
          <p>{note.content}</p>
          <button>Delete Note</button>
        </div>
      );
    });
    return formattedFilteredNote;
  };

  render() {
    return <>{this.displayNote()}</>;
  }
}

export default Note;
