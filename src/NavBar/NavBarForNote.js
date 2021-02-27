import React, { Component } from "react";

class NavBarForNote extends Component {
  // This function should display the "Go Back" button and the folder name as the NavBar
  displayNotesNavBar = () => {
    const { folders } = this.props.state;
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
