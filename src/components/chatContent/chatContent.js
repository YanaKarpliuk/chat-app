import React, { useState, useEffect, useRef } from "react";
import users from "../../storage/users";
import Avatar from "../chatList/Avatar";
import sendIcon from "../images/send.svg";
import ChatItem from "./chatItem";
import axios from "axios";
import { Notify } from "notiflix";
import { useParams } from "react-router-dom";
import "./chatContent.css";

// Style for notifications
Notify.init({
  borderRadius: "23px",
  info: {
    background: "#3C4154",
    notiflixIconColor: "#fff"
  },
});

export default function ChatContent({ chats, setChats }) {
  const { id = "1" } = useParams();
  const message = useParams();
  const chatMsg = chats[message];
  const chat = chats[id];
  const user = users.find((chat) => chat.id.toString() === id);

  // Add to LS
  useEffect(() => {
    localStorage.setItem("dataKey", JSON.stringify(chats));
  }, [chats]);

  // Send message
  const sendMessage = (e) => {
    e.preventDefault();

    const date = new Date()
    const value = e.target.message.value;

    setChats((chats) => {
      const message = {
        id: chats[id].length + 1,
        message: value,
        type: "sent",
        date: date.toLocaleString("en-GB", { dateStyle: "short", timeStyle: "short" }),
      };

      const chat = [...chats[id], message];

      return {
        ...chats,
        [id]: chat,
      };
    });

    e.target.message.value = "";

    setTimeout(() => {
      getJoke();
    }, 10000);
  };

  // Get API response
  async function getJoke() {
    const urlAPI = "https://api.chucknorris.io/jokes/random";

    axios
      .get(urlAPI)
      .then((response) => {
        setChats((chats) => {
          const date = new Date()

          const message = {
            id: chats[id].length + 1,
            message: response.data.value,
            type: "received",
            date: date.toLocaleString("en-GB", { dateStyle: "short", timeStyle: "short" }),
          };

          const chat = [...chats[id], message];

          return {
            ...chats,
            [id]: chat,
          };
        });
      })
      .catch((error) => console.log(error));

    Notify.info(`Нове повідомлення від: ${user.name}`);
  }

  // Scroll to bottom
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats]);

  return (
    <div className="main-chatcontent">
      <div className="content-sections">
        <div className="content-header">
          <div className="current-chatting-user">
            <Avatar image={user.image} />
            <p className="current-chatting-user-name">{user.name}</p>
          </div>
        </div>
        <div className="content-body">
          <div className="chat-items">
            {chat.map((item) => {
              return (
                <ChatItem
                  key={item.id}
                  type={item.type}
                  message={item.message}
                  image={item.type === "received" ? user.image : undefined}
                  date={item.date}
                />
              );
            })}
          </div>
          <div ref={bottomRef} />
        </div>
      </div>
      <div className="content-footer">
        <form onSubmit={sendMessage}>
          <input
            name="message"
            id="chattextbox"
            type="text"
            placeholder="Написати повідомлення"
            required
          />
          <button className="sendMsgBtn">
            <img className="" src={sendIcon} />
          </button>
        </form>
      </div>
    </div>
  );
}
