import React, { Component } from "react";

class FolderOne extends Component {
  displayFolderNotes = () => {
    // const { folders } = this.props.state;
    const { notes } = this.props.state;
    const { folderId } = this.props;
    const filteredNotes = notes.filter(note => note.folderId === folderId);
    const formattedFilteredNotes = filteredNotes.map((note, i) => {
        return (
            <div key={i} className="note-card">
                <h2>{note.name}</h2>
                <p>Folder ID: {note.folderId}</p>
                <p>Date modified on {note.modified}</p>
                <button>Delete Note</button>
            </div>
        )
    })
    return formattedFilteredNotes;
  };
  render() {
    return <>
    {this.displayFolderNotes()}
    This is folder one</>;
  }
}

export default FolderOne;
