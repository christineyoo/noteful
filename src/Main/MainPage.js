import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import ApiContext from "../ApiContext";
import "./MainPage.css";

// Makes DELETE request to backend service
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

class MainPage extends Component {
  static contextType = ApiContext;

  // Responsible for displaying all the notes on the "/" route
  displayNotes = () => {
    const copyNotes = this.context.notes || [];
    const formattedNotes = copyNotes.map((note, i) => {
      return (
        <ApiContext.Consumer>
          {(context) => (
            <div className="note-card" key={i}>
              <NavLink to={`/note/${note.id}`}>
                <h2>{note.name}</h2>
              </NavLink>
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
    return formattedNotes;
  };

  render() {
    return (
      <>
        {this.displayNotes()}
        <button>Add Note</button>
      </>
    );
  }
}

export default MainPage;
