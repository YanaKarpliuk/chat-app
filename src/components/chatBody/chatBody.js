import React, { useState } from "react";
import "./chatBody.css";
import ChatList from "../chatList/chatList";
import ChatContent from "../chatContent/chatContent";
import { Route, Routes } from "react-router-dom";
import initialChats from "../../storage/chats";

export default function ChatBody() {
  const [chats, setChats] = useState(
    localStorage.getItem("dataKey")
      ? JSON.parse(localStorage.getItem("dataKey"))
      : initialChats
  );

  return (
    <div className="chatbody">
      <ChatList chats={chats} />
      <Routes>
        <Route
          path="/:id"
          element={<ChatContent chats={chats} setChats={setChats} />}
        />
        <Route
          path="/"
          element={<ChatContent chats={chats} setChats={setChats} />}
        />
      </Routes>
    </div>
  );
}
