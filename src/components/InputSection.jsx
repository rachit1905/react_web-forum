import React from "react";

const InputSection = ({ writeChat }) => {
  return (
    <>
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Post a message"
          id="chatInput"
          autoComplete="off"
          spellCheck="true"
        />
        <button id="inputButton" onClick={writeChat}>
          <img
            src="https://img.icons8.com/external-prettycons-flat-prettycons/47/000000/external-send-social-media-prettycons-flat-prettycons.png"
            alt="Send"
          />
        </button>
      </div>
    </>
  );
};

export default InputSection;
