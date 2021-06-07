import React from "react";
import './App.css';
import MessageSent from "./components/message.sent.jsx";
import MessageReceived from "./components/message.received.jsx";

function App() {

  const [data, setData] = React.useState(null);

  const user_id = sessionStorage.getItem("user_id");
  const headers = new Headers({"Content-Type": "application/json"});

  React.useEffect(() => {
    fetch("http://localhost:3001/listMessages", 
      { method: "POST", headers, body: JSON.stringify({ user_id })})
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data.message);
      })
      .catch(e => console.error(e));
  }, []);

  console.log(data);

  return (
    <div className="main">
      <header>
          <h1>Talking Small</h1>
      </header>
      <div className="container">
          <nav className="nav"></nav>
          <div className="talk-content">
              <MessageSent content="Teste" />
              <MessageReceived content="Teste" />

              <MessageSent content="Teste" />
              <MessageReceived content="Teste" />

              <MessageSent content="Teste" />
              <MessageReceived content="Teste" />

              <MessageSent content="Teste" />
              <MessageReceived content="Teste" />

              <MessageSent content="Teste" />
              <MessageReceived content="Teste" />

              <MessageSent content="Teste" />
              <MessageReceived content="Teste" />
              <MessageSent content="Teste" />
              <MessageReceived content="Teste" />
              <MessageSent content="Teste" />
              <MessageReceived content="Teste" />
              <MessageReceived content="última mensagem" />
              <MessageSent content="última mensagem" />
              <div className="talk-footer">
                  <input type="text" name="message-input" id="message-input" className="message-input" placeholder="Message" />
                  <button className="message-send">Send</button>
              </div>
          </div>
      </div>
    </div>
  );
}

export default App;
