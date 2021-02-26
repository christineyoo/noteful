import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";

class NavBar extends Component {
  displayNavBar = () => {
    const { folders } = this.props.state;
    const folderNavBar = folders.map((folder, i) => {
      return (
        <div className="folder-card" key={i}>
          <NavLink to={`/folder/${folder.id}`}>{folder.name}</NavLink>
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
