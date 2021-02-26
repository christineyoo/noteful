import React, { Component } from "react";
import './NavBar.css';

class NavBar extends Component {
    displayNavBar = () => {
        const { folders } = this.props.state;
        const folderNavBar = folders.map((folder, i) => {
          return (
            <div className="folder-card" key={i}>
              <p>{folder.name}</p>
            </div>
          );
        });
        return folderNavBar;
      };
  render() {
    return <>{this.displayNavBar()}
   <button>Add Folder</button> 
    </>;
  }
}

export default NavBar;
