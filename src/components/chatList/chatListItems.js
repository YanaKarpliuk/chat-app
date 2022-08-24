import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import iconImg from "../images/icon.png";
import Avatar from "./Avatar";
import chats from "../../storage/chats";

export default function ChatListItems(props) {
  return (
    <NavLink
      className="chatlist-item"
      to={`/${props.id}`}
    >
      <Avatar
        image={props.image ? props.image : iconImg}
      />

      <div className="user-meta">
        <div>
          <p className="user-meta-name">{props.name}</p>
          <p className="user-meta-msg">{props.chats[props.id].slice(-1)[0]?.message || ""}</p>
        </div>
        <div className="user-meta-date">{props.chats[props.id].slice(-1)[0]?.date || ""}</div>
      </div>
    </NavLink>
  );
}
