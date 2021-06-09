import React from "react";
import './App.css';
import Talk from "./components/talk";
import TalkCard from './components/talk.card';

const messagesToTalks = (messages, talks) => {

    console.log(messages);

    if(!messages) return;

    const { sent_messages, received_messages } = messages;

    for(let sent of sent_messages) {
        if(talks[sent.receiver_name]) {
            talks[sent.receiver_name].messages.push(['sent', sent.text, sent.created_at]);
        } else {
            talks[sent.receiver_name] = {
                contact_id: sent.contact_id,
                messages: [['sent', sent.text, sent.created_at]],
            };
        }
    }

    for(let received of received_messages) {
        if(talks[received.sender_name]) {
            talks[received.sender_name].messages.push(['received', received.text, received.created_at]);
        } else {
            talks[received.sender_name] = {
                contact_id: received.contact_id,
                messages: [['received', received.text, received.created_at]],
            };
        }
    }
    
    return talks;
}

const loadTalks = (data) => {

  const talks = messagesToTalks(data, {});
  console.log(talks);
  for(let talk in talks) {
    talks[talk].messages.sort((m1, m2) => {
        if (m1[2] < m2[2]) return -1;
        else if(m1[2] == m2[2]) return 0;
        else return 1;
    });
  }

  return talks;

};

const loadTalkCards = (talks) => {

  const talk_cards = Object.keys(talks).map( k => {
    const messages = talks[k].messages;
    const last_message = messages[messages.length - 1][1];
    return <TalkCard name={k} lastMessage={last_message.slice(0,30)}/>;
  });

  return talk_cards;

}

function App() {

  const [data, setData] = React.useState(null);

  const user_id = sessionStorage.getItem("user_id");
  const headers = new Headers({"Content-Type": "application/json"});

  React.useEffect(() => {
    fetch("http://localhost:3001/listMessages", 
      { method: "POST", headers, body: JSON.stringify({ user_id })})
      .then((res) => res.json())
      .then((data) => {
        console.log(`Data: ${data}`);
        setData(data);
      })
      .catch(e => console.error(e));
  }, []);

  let talks = null;
  let talk_cards = null;

  if(data != null) {
    talks = loadTalks(data);
    talk_cards = loadTalkCards(talks);
  }

  return (
    <div className="main">
      <header>
          <h1>Talking Small</h1>
      </header>
      <div className="container">
          <nav className="nav">
            {talk_cards ? talk_cards : "Loading"}
          </nav>
          <div className="talk-content">
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
