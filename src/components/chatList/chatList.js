import React, { useState } from "react";
import iconImg from "../images/icon.png";
import "./chatList.css";
import ChatListItems from "./chatListItems";
import initialUsers from "../../storage/users";
import Avatar from "./Avatar";
import { Notify } from "notiflix";

export default function ChatList(props) {
  const [users, setUsers] = useState(initialUsers);
  const [searchUser, setSearchUser] = useState("");
  const filteredUsers = users.filter((val) => {
    if (searchUser == "") {
      return val;
    } else if (val.name.toLowerCase().includes(searchUser.toLowerCase())) {
      return val;
    }
  });

  return (
    <div className="chatlist">
      <div className="chatlist-top">
        <div className="icon-section">
          <Avatar image={props.image ? props.image : iconImg} />
        </div>
        <div className="chatlist-search">
          <input
            className="chatlist-input"
            type="text"
            placeholder="Пошук чатів"
            onChange={(e) => {
              setSearchUser(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="chatlist-bottom">
        {filteredUsers.length ? (
          <div className="chatlist-main">
            <h2 className="chatlist-heading">Чати</h2>
            <div className="chatlist-items">
              {filteredUsers.map((user) => {
                return (
                  <ChatListItems key={user.id} {...user} chats={props.chats} />
                );
              })}
            </div>
          </div>
        ) : (
          <h2 className="chatlist-heading">Не знайдено</h2>
        )}
      </div>
    </div>
  );
}
