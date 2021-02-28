import React, { Component } from "react";
import ApiContext from "../ApiContext";

class NavBarForNote extends Component {
  static contextType = ApiContext;

  // This function should display the "Go Back" button and the folder name as the NavBar
  displayNotesNavBar = () => {
    const copyNotes = this.context.notes || [];
    const copyFolders = this.context.folders || [];
    const currentNote = copyNotes.filter(
      (note) => note.id === this.props.match.params.noteId
    )[0];
    const filteredFolder = copyFolders.filter(
      (folder) => folder.id === currentNote.folderId
    );
    console.log(filteredFolder);
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
