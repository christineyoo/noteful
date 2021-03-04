import React, { Component } from "react";
import ApiContext from "../ApiContext";
import ValidationError from "../ValidationError/ValidationError";

// This component creates a form that adds a new note.
// There should be a POST request to the /notes endpoint on the server
class AddNote extends Component {
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

  validateName = () => {
    const name = this.state.name.value.trim();
    if (name.length === 0) {
      return "Folder name is required";
    }
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
            <input
              type="text"
              name="folder"
              id="folder"
              onChange={(e) => this.inputFolderName(e.target.value)}
            />
            <br />
            {this.state.name.touched && (
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
            {this.state.name.touched && (
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
