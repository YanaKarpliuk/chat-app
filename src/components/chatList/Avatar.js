import React from "react";
import emptyAvatarImage from "../images/icon.png";

export default function Avatar(props) {
    return (
      <div className="avatar">
        <img src={props.image || emptyAvatarImage} alt="avatar" />
        <span className="isOnline"></span>
      </div>
    );
  }
