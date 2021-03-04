import React, { Component } from "react";
import ApiContext from "../ApiContext";
import ValidationError from "../ValidationError/ValidationError";
import './AddNote.css';

// This component creates a form that adds a new note.
// There should be a POST request to the /notes endpoint on the server
class AddNote extends Component {
  static contextType = ApiContext;
  state = {
    name: {
      value: "",
      touched: false,
    },
    content: {
      value: "",
      touched: false,
    },
    folder: {
      value: "",
      touched: false,
    },
  };

  //   Functions to change the state
  inputName = (noteName) => {
    this.setState({
      name: {
        value: noteName,
        touched: true,
      },
    });
  };

  inputFolderName = (folderName) => {
    this.setState({
      folder: {
        value: folderName,
        touched: true,
      },
    });
  };

  inputContent = (content) => {
    this.setState({
      content: {
        value: content,
        touched: true,
      },
    });
  };
  //   Validation functions for name and content fields
  validateName = () => {
    const name = this.state.name.value.trim();
    if (name.length === 0) {
      return "A name for the note is required";
    }
  };

  validateFolderName = () => {};

  validateContent = () => {
    const content = this.state.content.value.trim();
    if (content.length === 0) {
      return "Content for the note is required";
    }
  };

  displayFolderOptions = () => {
    const copyFolders = this.context.folders || [];
    const folderOptions = copyFolders.map((folder, i) => {
      return (
        <option key={i} value={folder.id}>
          {folder.name}
        </option>
      );
    });
    return folderOptions;
  };

  handleSubmit = (event, callback) => {
    event.preventDefault();
    const { name, content } = this.state;
    const noteName = name.value;
    const noteContent = content.value;

    fetch("http://localhost:9090/notes", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        this.props.history.push("/");

        callback(data, noteName, noteContent);
      })
      .catch((error) => this.setState({ error }));
  };

  render() {
    return (
      <ApiContext.Consumer>
        {(context) => (
          <form
            className="note"
            onSubmit={(e) => this.handleSubmit(e, context.addNote)}
          >
            <h2>Create a Note</h2>
            <label htmlFor="name">Note Name </label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={(e) => this.inputName(e.target.value)}
            />
            <br />
            {this.state.name.touched && (
              <ValidationError message={this.validateName()} />
            )}
            <br />
            <label htmlFor="folder">Folder Name </label>
            <select
              name="folder"
              id="folder"
              onChange={(e) => this.inputFolderName(e.target.value)}
            >
              {this.displayFolderOptions()}
            </select>

            <br />
            {this.state.folder.touched && (
              <ValidationError message={this.validateFolderName()} />
            )}
            <br />
            <label htmlFor="content">Content </label><br />
            <textarea
              name="content"
              id="content"
              onChange={(e) => this.inputContent(e.target.value)}
              cols="40"
              rows="5"
            />
            <br />
            {this.state.content.touched && (
              <ValidationError message={this.validateContent()} />
            )}
            <br />
            <button type="reset" onClick={() => this.props.history.push("/")}>
              Cancel
            </button>
            <button
              type="submit"
              disabled={
                this.validateName() ||
                this.validateFolderName() ||
                this.validateContent()
              }
            >
              Save
            </button>
          </form>
        )}
      </ApiContext.Consumer>
    );
  }
}

export default AddNote;
