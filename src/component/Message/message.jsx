import React, { useEffect, useRef } from "react";
import "./message.scss";
import { useContext } from "react";
import { authContext } from "../../context/authContext";
import { ChatContext } from "../../context/ChatContext";

export default function Message({ message }) {
  const { currentUser } = useContext(authContext);
  const { data } = useContext(ChatContext);
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <>
      <div
        ref={ref}
        className={`message ${message.senderId === currentUser.uid && "owner"}`}
      >
        <div className="messageInfo">
          <img
            src={
              message.senderId === currentUser.uid
                ? currentUser.photoURL
                : data.user.photoURL
            }
            alt="img"
          />
          <span>Jast Now</span>
        </div>
        <div className="messageContent">
          {message.text && <p>{message.text}</p>}
          {message.img && <img src={message.img} alt="img" />}
        </div>
      </div>
    </>
  );
}
