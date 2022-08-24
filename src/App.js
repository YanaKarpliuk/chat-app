import { Route, Routes } from "react-router-dom";
import "./App.css";
import ChatBody from "./components/chatBody/chatBody";

function App() {
  return (
    <Routes>
      <Route
        path="*"
        element={
          <div className="main">
            <ChatBody />
          </div>
        }
      />
    </Routes>
  );
}

export default App;
