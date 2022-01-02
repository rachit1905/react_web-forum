import React from "react";

const Eachchat = (props) => {
  return props.chat.senderEmail === props.userEmail ? (
    <div
      style={{
        display: "flex",
        flexDirection: "row-reverse",
        alignItems: "flex-start",
      }}
    >
      <div>
        <img
          src={props.userPhoto}
          alt="User"
          style={{ height: "33px", margin: "10px 0 0" }}
        />
      </div>
      <div
        className="eachChat"
        style={{
          marginRight: "10px",
          marginLeft: "auto",
          backgroundColor: "var(--sentChat-bg)",
        }}
      >
        <label className="userName">{props.chat.name}</label>
        <div className="userMessage">{props.chat.chat}</div>
      </div>
    </div>
  ) : (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
        }}
      >
        <img
          src={props.chat.senderAvatar}
          alt="User"
          style={{ height: "33px", margin: "10px 0 0" }}
        />
        <div className="eachChat">
          <label className="userName">{props.chat.name}</label>
          <div className="userMessage">{props.chat.chat}</div>
        </div>
      </div>
    </>
  );
};

export default Eachchat;
