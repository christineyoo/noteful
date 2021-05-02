import React, { Component } from "react";
import ApiContext from "../ApiContext";
import PropTypes from "prop-types";

class Note extends Component {
  static propTypes = {
    history: PropTypes.object
  };
  static contextType = ApiContext;

  // Sends a DELETE request for a note when on the "/note" route
  deleteNoteRequest(noteId, callback) {
    fetch(`http://localhost:8000/api/notes/${noteId}`, {
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
        this.props.history.push("/");
        callback(noteId);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // This function displays the note that the user selected.
  displayNote = () => {
    const copyNotes = this.context.notes || [];
    const filteredNote = copyNotes.filter(
      (note) => note.id === this.props.match.params.noteId
    );
    const formattedFilteredNote = filteredNote.map((note, i) => {
      return (
        <ApiContext.Consumer key={i}>
          {(context) => (
            <div className="note-card">
              <h2>{note.name}</h2>
              <p>Date modified on {note.modified}</p>
              <p>{note.content}</p>
              <button
                onClick={() =>
                  this.deleteNoteRequest(note.id, context.deleteNote)
                }
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
