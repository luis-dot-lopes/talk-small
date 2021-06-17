import React from "react";
import './App.css';
import TalkCard from './components/talk.card';
import MessageSent from './components/message.sent';
import MessageReceived from './components/message.received';
import io from 'socket.io-client';

let socket = io('http://localhost:3001');
let loaded_talks = null;

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

const loadTalks = (data, old_talks) => {

  console.log(old_talks);

  const talks = messagesToTalks(data, old_talks);
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

const loadTalkCards = (talks, component) => {

  const talk_cards = Object.keys(talks).map( k => {
    const messages = talks[k].messages;
    const last_message = messages[messages.length - 1][1];
    return <TalkCard component={component}
        name={k} lastMessage={last_message.slice(0,30)}/>;
  });

  return talk_cards;

}

const loadTalkMessages = (talks, talk_name) => {
  console.log(talk_name);
  const talk = talks[talk_name];

  return talk.messages.map( message => {
    if(message[0] == 'sent') {
      return <MessageSent content={message[1]}/>
    } else {
      return <MessageReceived content={message[1]} />
    }
  });
}

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {talks: null, current_talk: null};

    socket.emit("loggedIn", {
      user_id: sessionStorage.getItem("raw_id"),
    }, data => console.log(`Emitted. Result ${data}`));


    console.log(socket);

    console.log("constructed");

  }

  componentDidMount() {

    const user_id = sessionStorage.getItem("user_id");
    const headers = new Headers({"Content-Type": "application/json"});

    fetch("http://localhost:3001/listMessages", 
      { method: "POST", headers, body: JSON.stringify({ user_id })})
      .then((res) => res.json())
      .then((newData) => {
        console.log(`Data: ${newData}`);
        const talks = loadTalks(newData, {});
        const current_talk = Object.keys(talks)[0];
        this.setState({ talks, current_talk });
        loaded_talks = talks;
      })
      .catch(e => console.error(e));

    socket.on("message-received", (message) => {
      console.log(this);
      const talks = loadTalks(message, loaded_talks);
      this.setState({ talks });
      loaded_talks = talks;
      console.log(message);
      console.log("received message");
    });

  }

  sendMessage() {

    const text = document.querySelector("#message-input").value;
    document.querySelector("#message-input").value = "";

    socket.emit("message", {
      text,
      session_id: sessionStorage.getItem('user_id'),
      receiver_id: this.state.talks[this.state.current_talk].contact_id,
    }, (message) => {
      const talks = loadTalks(message, this.state.talks);
      this.setState({ talks });
      loaded_talks = talks;
    });

  }

  render() {

    console.log("rendering");

    let talk_cards = null;
    let talk_messages = null;

    if(this.state.talks != null) {
      talk_cards = loadTalkCards(this.state.talks, this); 
      talk_messages = loadTalkMessages(this.state.talks, this.state.current_talk);

      console.log("updated");
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
                <div className="talk-header">
                  <h2>{this.state.current_talk}</h2>
                  <p>Last seen 4:20</p>
                </div>
                {talk_messages ? talk_messages : "Loading"}
                <div className="talk-footer">
                    <input type="text" name="message-input" id="message-input" className="message-input" placeholder="Message" />
                    <button onClick={() => this.sendMessage()} className="message-send">Send</button>
                </div>
            </div>
        </div>
      </div>
    );
  }
}

export default App;
