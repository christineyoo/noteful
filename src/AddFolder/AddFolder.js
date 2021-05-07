import React, { Component } from 'react';
import ApiContext from '../ApiContext';
import PropTypes from 'prop-types';
import ValidationError from '../ValidationError/ValidationError';
import './AddFolder.css';

// This component creates a form that adds a new folder.
// There should be a POST request to the /folders endpoint on the server
class AddFolder extends Component {
  static propTypes = {
    history: PropTypes.object
  };

  state = {
    name: {
      value: '',
      touched: false
    }
  };

  inputName = (folderName) => {
    this.setState({
      name: {
        value: folderName,
        touched: true
      }
    });
  };

  handleSubmit = (event, callback) => {
    event.preventDefault();
    const { name } = this.state;
    const folderName = name.value;

    fetch('https://christine-noteful.herokuapp.com/api/folders', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        folder_name: folderName
      })
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then((data) => {
        this.props.history.push('/');
        callback(data, folderName);
        this.context.fetchNotes();
      })
      .catch((error) => this.setState({ error }));
  };

  validateName = () => {
    const name = this.state.name.value.trim();
    if (name.length === 0) {
      return 'A name for the folder is required';
    }
  };

  render() {
    return (
      <ApiContext.Consumer>
        {(context) => (
          <form
            className='folder'
            onSubmit={(e) => this.handleSubmit(e, context.addFolder)}
          >
            <h2>Create a Folder</h2>
            <label htmlFor='name'>Folder Name </label>
            <input
              type='text'
              name='name'
              id='name'
              onChange={(e) => this.inputName(e.target.value)}
            />
            <br />
            {this.state.name.touched && (
              <ValidationError message={this.validateName()} />
            )}
            <br />
            <button type='reset' onClick={() => this.props.history.goBack()}>
              Cancel
            </button>
            <button type='submit' disabled={this.validateName()}>
              Save
            </button>
          </form>
        )}
      </ApiContext.Consumer>
    );
  }
}

export default AddFolder;
