import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import ApiContext from "../ApiContext";
import "./NavBar.css";

class NavBar extends Component {
  static contextType = ApiContext;

  displayNavBar = () => {
    const copy = this.context.folders || [];
    const folderNavBar = copy.map((folder, i) => {
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
    return folderNavBar;
  };
  render() {
    return (
      <>
        {this.displayNavBar()}
        <button>Add Folder</button>
      </>
    );
  }
}

export default NavBar;
