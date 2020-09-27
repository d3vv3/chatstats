import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

// Style
import "../styles/style.scss";

function FileInput(props) {
  const [fileName, setFileName] = useState(null);

  const updateFormState = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "file":
        setFileName(value);
        // console.log(name, event);
        break;
      default:
        return;
    }
  };

  const submitForm = (event) => {
    console.log("File submited!");
    return null;
  };

  return (
    <div className="input-container">
      <form method="post" action="#" onSubmit={submitForm.bind(this)}>
        <input
          className="inputfile"
          type="file"
          onChange={updateFormState}
          name="file"
          id="file"
          placeholder="Your chat file goes here"
        />
        <label htmlFor="file">
          <FontAwesomeIcon icon={faUpload} /> Select chat
        </label>
      </form>
      <h3>{fileName}</h3>
      {
        //Conditionally render "Go!" button if chat file selected
      }
      {fileName != null ? (
        <button className="go-button" onClick={submitForm.bind(this)}>
          Go!
        </button>
      ) : null}
    </div>
  );
}

export default FileInput;
