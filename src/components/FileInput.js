import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { fileReader } from "../modules/readers/fileReader.js";
import { useNavigate } from "react-router-dom";

// Style
import "../styles/style.scss";

function FileInput(props) {
  const [fileName, setFileName] = useState(null);
  const [fileContent, setFileContent] = useState(null);

  const updateFormState = (event) => {
    const { name, value, files } = event.target;
    switch (name) {
      case "file":
        setFileName(value);
        setFileContent(files[0]);
        props.setFileInserted(value);
        // console.log(name, event.target);
        break;
      default:
        return;
    }
  };

  const navigate = useNavigate();

  const submitForm = (event) => {
    // Avoid the classic submit redirection
    event.preventDefault();
    // Set app state to chatObject
    fileReader(fileContent, fileName, props.setChatObject);
    console.log("File submited!");
    // Push to the next page
    navigate("/graphs");
    return null;
  };

  return (
    <div className="input-container">
      <form
        className="input-container"
        method="get"
        action="/graphs"
        onSubmit={submitForm.bind(this)}
      >
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
        <h3>{fileName != null ? fileName.slice(12) : null}</h3>
        {
          //Conditionally render "Go!" button if chat file selected
        }
        {fileName != null ? (
          <button className="go-button" type="submit">
            Go!
          </button>
        ) : null}
      </form>
    </div>
  );
}

// This is so the component can redirect pushing to the browser history
export default FileInput;
