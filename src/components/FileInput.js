import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

// Style
import "../styles/style.scss";

class FileInput extends Component {
  render() {
    return (
      <div>
        <input type="file" name="file" id="file" class="inputfile" />
        <label for="file">
          <FontAwesomeIcon icon={faUpload} /> Import chat
        </label>
      </div>
    );
  }
}

export default FileInput;
