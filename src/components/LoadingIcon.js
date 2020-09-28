import React from "react";

// Local imports

// Style
import "../styles/style.scss";

function LoadingIcon() {
  return (
    <div class="loading-container">
      <h2>Creating your graphs!</h2>
      <div class="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default LoadingIcon;
