import React, { Component } from "react";
import "./MainPage.css";

class MainPage extends Component {
  displayNotes = () => {
    const { notes } = this.props.state;
    const formattedNotes = notes.map((note, i) => {
      return (
        <div className="note-card" key={i}>
          <h2>{note.name}</h2>
          <p>Date modified on {note.modified}</p>
          <button>Delete</button>
        </div>
      );
    });
    return formattedNotes;
  };
  render() {
    return <>{this.displayNotes()}</>;
  }
}

export default MainPage;
