import React, { Component } from "react";

class NavBarForNote extends Component {
  // This function should display the "Go Back" button and the folder name as the NavBar
  displayNotesNavBar = () => {
    const { notes, folders } = this.props.data;
    const currentNote = notes.filter(
      (note) => note.id === this.props.match.params.noteId
    )[0];
    const filteredFolder = folders.filter(
      (folder) => folder.id === currentNote.folderId
    );
    return (
      <div>
        <button onClick={() => this.props.history.goBack()}>Go Back</button>
        {!!filteredFolder.length && <p>{filteredFolder[0].name}</p>}
      </div>
    );
  };
  render() {
    return <>{this.displayNotesNavBar()}</>;
  }
}

export default NavBarForNote;
