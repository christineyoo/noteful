import React, { Component } from "react";
import { NavLink } from "react-router-dom";
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

class Folder extends Component {
  static contextType = ApiContext;

  // This function should check which folder the user clicked on and display the notes for that accordingly.
  displayFolderNotes = () => {
    const copyNotes = this.context.notes || [];
    const filteredNotes = copyNotes.filter(
      (note) => note.folderId === this.props.match.params.folderId
    );
    const formattedFilteredNotes = filteredNotes.map((note, i) => {
      return (
        <ApiContext.Consumer>
          {(context) => (
            <div key={i} className="note-card">
              <NavLink to={`/note/${note.id}`}>
                <h2>{note.name}</h2>
              </NavLink>
              <p>Folder ID: {note.folderId}</p>
              <p>Date modified on {note.modified}</p>
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
    return formattedFilteredNotes;
  };

  render() {
    return (
      <>
        {this.displayFolderNotes()}
        <button>Add Note</button>
      </>
    );
  }
}

export default Folder;
