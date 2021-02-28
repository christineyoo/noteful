import React, { Component } from "react";
import {NavLink} from 'react-router-dom';
import ApiContext from "../ApiContext";
import "./MainPage.css";

class MainPage extends Component {
  static contextType = ApiContext;

  displayNotes = () => {
    const copyNotes = this.context.notes || [];
    const formattedNotes = copyNotes.map((note, i) => {
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
