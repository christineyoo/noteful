import React, { Component } from "react";
import ApiContext from "../ApiContext";

function deleteNoteRequest(noteId, callback) {
  fetch(`http://localhost:9090/notes/${noteId}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
    },
  })
    .then((res) => {
      if (!res.ok) {
        return res.json().then((error) => {
          throw error;
        });
      }
      return res.json();
    })
    .then((data) => {
      callback(noteId);
    })
    .catch((error) => {
      console.error(error);
    });
}

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
        <ApiContext.Consumer>
          {(context) => (
            <div key={i} className="note-card">
              <h2>{note.name}</h2>
              <p>Date modified on {note.modified}</p>
              <p>{note.content}</p>
              <button
                onClick={() => deleteNoteRequest(note.id, context.deleteNote)}
              >
                Delete Note
              </button>
            </div>
          )}
        </ApiContext.Consumer>
      );
    });
    return formattedFilteredNote;
  };

  render() {
    return <>{this.displayNote()}</>;
  }
}

export default Note;
