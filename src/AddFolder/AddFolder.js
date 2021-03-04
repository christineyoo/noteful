import React, { Component } from "react";
import ApiContext from "../ApiContext";

// This component creates a form that adds a new folder.
// There should be a POST request to the /folders endpoint on the server
class AddFolder extends Component {
  state = {
    name: {
      value: "",
      touched: false,
    },
  };

  inputName = (folderName) => {
    this.setState({
      name: {
        value: folderName,
        touched: true,
      },
    });
  };

  handleSubmit = (event, callback) => {
    event.preventDefault();
    const { name } = this.state;

    fetch("http://localhost:9090/folders", {
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
      .then((data) => callback(name.value))
      .catch((error) => this.setState({ error }));
  };

  render() {
    return (
      <ApiContext.Consumer>
        {(context) => (
          <form className="folder" onSubmit={(e) => this.handleSubmit(e, context.addFolder)}>
            <h2>Create a Folder</h2>
            <label htmlFor="name">Folder Name </label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={(e) => this.inputName(e.target.value)}
            />
            <br />
            <button type="reset">Cancel</button>
            <button type="submit">Save</button>
          </form>
        )}
      </ApiContext.Consumer>
    );
  }
}

export default AddFolder;
