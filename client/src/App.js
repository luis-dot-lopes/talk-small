import React from "react";
import './App.css';
import MessageSent from "./components/message.sent.jsx";
import MessageReceived from "./components/message.received.jsx";

function App() {

  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("http://localhost:3001/test-react")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data.message);
      })
      .catch(e => console.error(e));
  }, []);

  return (
    <div className="main">
      <header>
          <h1>Talking Small: { !data ? "Loading..." : data}</h1>
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
