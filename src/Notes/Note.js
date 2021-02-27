import React, { Component } from "react";

class Note extends Component {
  // This function should display the note that the user selected with the content showing.
  displayNote = () => {
    const { notes } = this.props.state;
    const filteredNote = notes.filter(
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
