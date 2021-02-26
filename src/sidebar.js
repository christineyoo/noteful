import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./sidebar.css";

class Sidebar extends Component {
  displaySidebar = () => {
    const foldersArray = this.props.folders;
    const formattedFolders = foldersArray.map((folder, i) => {
      return (
        <div className="folder-card" key={i}>
          <Link to="/">{folder.name}</Link>
        </div>
      );
    });
    return formattedFolders;
  };

  render() {
    return (
      <div>
        {this.displaySidebar()}
        <button>Add Folder</button>
      </div>
    );
  }
}

export default Sidebar;
