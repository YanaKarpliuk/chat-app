import React from "react";
import Avatar from "../chatList/Avatar";

export default function ChatItem(props) {
  return (
    <div className={`chat-item ${props.type}`}>
      <div className="chat-content-meta">
        <div className="chat-item-content">
          <div className="chat-msg">{props.message}</div>
        </div>
        <div className="chat-meta">{props.date}</div>
      </div>
      <Avatar image={props.image}/>
    </div>
  );
}
