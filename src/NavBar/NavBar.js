import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import ApiContext from "../ApiContext";
import "./NavBar.css";

class NavBar extends Component {
  static contextType = ApiContext;

  // Returns the nav bar for the "/" and "/folder" routes
  displayNavBar = () => {
    const copyFolders = this.context.folders || [];
    const folderNavBar = copyFolders.map((folder, i) => {
      return (
        <div className="folder-card" key={i}>
          <NavLink
            to={`/folder/${folder.id}`}
            activeStyle={{ fontStyle: "bold", color: "red" }}
          >
            {folder.name}
          </NavLink>
        </div>
      );
    });
    console.log(copyFolders);
    return folderNavBar;
  };

  displayAddFolderForm = () => {
    console.log("You clicked displayAddfolderForm");
  };

  render() {
    return (
      <>
        {this.displayNavBar()}
        <NavLink to="/addFolder">
          <button onClick={() => this.displayAddFolderForm()}>
            Add Folder
          </button>
        </NavLink>
      </>
    );
  }
}

export default NavBar;
