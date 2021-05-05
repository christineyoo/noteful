import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import ApiContext from '../ApiContext';

class Folder extends Component {
  static propTypes = {
    match: PropTypes.object
  };

  static contextType = ApiContext;
  // Sends DELETE request for a selected note when on the "/folder" route
  deleteNoteRequest = (noteId, callback) => {
    fetch(`http://localhost:8000/api/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      }
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((error) => {
            throw error;
          });
        }
        return res.json();
      })
      .then((data) => {
        callback(noteId);
        this.context.fetchNotes();
      })
      .catch((error) => {
        console.error(error);
      });
  };
  // This function checks which folder the user clicked on and displays the notes accordingly.
  displayFolderNotes = () => {
    const copyNotes = this.context.notes || [];
    const filteredNotes = copyNotes.filter((note) => {
      console.log('note, this.match stuff', note, this.props.match.params);
      return +note.folder_id === +this.props.match.params.folderId;
    });
    const formattedFilteredNotes = filteredNotes.map((note, i) => {
      return (
        <ApiContext.Consumer key={i}>
          {(context) => (
            <div className='note-card'>
              <NavLink to={`/note/${note.id}`}>
                <h2>{note.name}</h2>
              </NavLink>
              <p>Folder ID: {note.folderId}</p>
              <p>Date modified on {note.modified}</p>
              <button
                onClick={() =>
                  this.deleteNoteRequest(note.id, context.deleteNote)
                }
              >
                Delete Note
              </button>
            </div>
          )}
        </ApiContext.Consumer>
      );
    });
    return formattedFilteredNotes;
  };

  render() {
    return (
      <>
        {this.displayFolderNotes()}
        <NavLink to='/addNote'>
          <button>Add Note</button>
        </NavLink>
      </>
    );
  }
}

export default Folder;
