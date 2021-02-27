import React, { Component } from "react";
import {NavLink} from 'react-router-dom';
import "./MainPage.css";

class MainPage extends Component {
  displayNotes = () => {
    const { notes } = this.props.state;
    const formattedNotes = notes.map((note, i) => {
      return (
        <div className="note-card" key={i}>
          <NavLink to={`/note/${note.id}`}><h2>{note.name}</h2></NavLink>
          <p>Date modified on {note.modified}</p>
          <button>Delete</button>
        </div>
      );
    });
    return formattedNotes;
  };
  render() {
    return <>{this.displayNotes()}
    <button>Add Note</button></>;
  }
}

export default MainPage;
