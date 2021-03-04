import React, { Component } from "react";
import ApiContext from "../ApiContext";
import ValidationError from "../ValidationError/ValidationError";

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

  inputFolderName = () => {};

  inputContent = (content) => {
    this.setState({
      content: {
        value: content,
        touched: true,
      },
    });
  };
  //   Validation functions for name, foldername, and content fields
  validateName = () => {
    const name = this.state.name.value.trim();
    if (name.length === 0) {
      return "Folder name is required";
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
        <option key={i} value={folder.name}>
          {folder.name}
        </option>
      );
    });
    console.log("copyfolders", copyFolders);
    console.log("folderOptions", folderOptions);
    return folderOptions;
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
            <label htmlFor="content">Content </label>
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
            <button type="reset" onClick={() => this.props.history.goBack()}>
              Cancel
            </button>
            <button type="submit" disabled={this.validateName()}>
              Save
            </button>
          </form>
        )}
      </ApiContext.Consumer>
    );
  }
}

export default AddNote;
