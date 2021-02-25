import React, { Component } from "react";
import "./sidebar.css";

class Sidebar extends Component {
  displaySidebar = () => {
    const foldersArray = this.props.folders;
    const formattedFolders = foldersArray.map((folder, i) => {
      return (
        <div className="folder-card" key={i}>
          <p>{folder.name}</p>
        </div>
      );
    });
    return formattedFolders;
  };

  render() {
    return (
      <div className="sidebar">
        {this.displaySidebar()}
        <button>Add Folder</button>
      </div>
    );
  }
}

export default Sidebar;
