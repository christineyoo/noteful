import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import ApiContext from "../ApiContext";

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
        <div key={i} className="note-card">
          <NavLink to={`/note/${note.id}`}>
            <h2>{note.name}</h2>
          </NavLink>
          <p>Folder ID: {note.folderId}</p>
          <p>Date modified on {note.modified}</p>
          <button>Delete Note</button>
        </div>
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
