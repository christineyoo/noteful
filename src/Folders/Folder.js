import React, { Component } from "react";

class Folder extends Component {
  // This function should check which folder the user clicked on and display the notes for that accordingly.
  displayFolderNotes = () => {
    const { notes } = this.props.state;
    const filteredNotes = notes.filter(
      (note) => note.folderId === this.props.match.params.folderId
    );
    const formattedFilteredNotes = filteredNotes.map((note, i) => {
      return (
        <div key={i} className="note-card">
          <h2>{note.name}</h2>
          <p>Folder ID: {note.folderId}</p>
          <p>Date modified on {note.modified}</p>
          <button>Delete Note</button>
        </div>
      );
    });
    return formattedFilteredNotes;
  };

  render() {
    return <>{this.displayFolderNotes()}</>;
  }
}

export default Folder;
