// Folder is responsible for rendering the notes that are in the folder that the user clicked.
import React, { Component } from "react";
import Sidebar from "./sidebar.js";

class Folder extends Component {
  displayNotesOfFolder = () => {
    const folders = this.props.folders;
    const folderOneId = "b0715efe-ffaf-11e8-8eb2-f2801f1b9fd1";
    const filteredFolders = folders.filter((folder, i) => folder.id === folderOneId);
  console.log(filteredFolders);
  }
  
  render() {
    return (
      <div>
        <Sidebar folders={this.props.folders} />
        <h1>Hello this is Folder</h1>
        {this.displayNotesOfFolder()};
      </div>
    );
  }
}

export default Folder;
