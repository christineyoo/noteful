import React, { Component } from "react";

class NavBarForNote extends Component {
  // This function should display the "Go Back" button and the folder name as the NavBar
  displayNotesNavBar = () => {
    // Based on the noteId in the url, determine the name of the folder that contains that note.
    // Issue: How to be able implement both "Go Back" button AND display the folder ID. Console log keeps saying currentNote.folderId is undefined.

    // const currentNote = notes.filter(note => note.id === this.props.match.params.noteId)[0];
    // console.log(currentNote)
    return (
      <div>
        <button onClick={() => this.props.onClickBack()}>Go Back</button>
      </div>
    );
  };
  render() {
    return <>{this.displayNotesNavBar()}</>;
  }
}

export default NavBarForNote;
