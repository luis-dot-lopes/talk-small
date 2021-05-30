//Talks will be hardcoded for testing
let talks = {};
let selected_talk;

//load talks on nav
const showCurrentTalks = () => {
    let nav = document.getElementsByTagName('nav')[0];
    nav.innerHTML = "";
    for(let talk_name in talks) {
        let talk = talks[talk_name].messages;
        let talk_div = document.createElement('div');
        talk_div.className = 'talk';
        let person_name = talk_name;
        let last_message = talk[talk.length - 1];
        let h3_node = document.createElement('h3');
        let h4_node = document.createElement('h4');
        h3_node.textContent = person_name;
        if(last_message[0] == 'sent') {
            h4_node.textContent = `You: ${last_message[1].slice(0, 30)}`;
        } else {
            h4_node.textContent = `${person_name}: ${last_message[1].slice(0, 30)}`;
        }
        talk_div.appendChild(h3_node);
        talk_div.appendChild(h4_node);
        talk_div.addEventListener("click", () => showTalkContent(talk_name));
        nav.appendChild(talk_div);
    }
}

const showTalkContent = (talk_name) => {

    selected_talk = talk_name;

    let talk = talks[talk_name].messages.sort((m1, m2) => {
        if (m1[2] < m2[2]) return -1;
        else if(m1[2] == m2[2]) return 0;
        else return 1;
    });

    let talk_content = document.getElementsByClassName('talk-content')[0];

    //cleaning current talk
    let old_talk_header = talk_content.getElementsByClassName('talk-header')[0];
    if(old_talk_header) {
        talk_content.removeChild(old_talk_header);
    }
    let old_talk_messages = talk_content.getElementsByClassName('talk-messages')[0];
    if(old_talk_messages) {
        talk_content.removeChild(old_talk_messages);
    }

    //creating talk header
    let talk_header = document.createElement('div');
    talk_header.className = 'talk-header';

    let h2 = document.createElement('h2');
    h2.textContent = talk_name;
    let p = document.createElement('p');
    p.textContent = "Last seen 4:20"; //hardcoded for now

    talk_header.appendChild(h2);
    talk_header.appendChild(p);

    //displaying messages
    let talk_messages = document.createElement('div');
    talk_messages.className = 'talk-messages';
    console.log(talk);
    for(message of talk) {
        let message_div = document.createElement('div');
        message_div.className = `message ${message[0]}`;
        message_div.textContent = message[1];
        talk_messages.appendChild(message_div);
    }

    talk_content.prepend(talk_messages);
    talk_content.prepend(talk_header);
    talk_messages.scrollBy(0, talk_messages.scrollHeight);
}

const messagesToTalks = messages => {

    console.log(messages);

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
        selected_talk = sent.receiver_name;
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
    console.log(talks);
}

window.onload = async () => {

    //Fetching messages from the server
    const user_id = sessionStorage.getItem("user_id");
    const headers = new Headers({"Content-Type": "application/json"});

    const messages = await fetch("listMessages", 
        { method: "POST", headers, body: JSON.stringify({ user_id }) })
    .then(async res => await res.json())
    .catch(() => console.error("Error while loading messages"));

    //Loading the interface
    messagesToTalks(messages);
    showCurrentTalks();
    showTalkContent(selected_talk);

    //setting up the 'Send' button
    let send_button = document.getElementsByClassName("message-send")[0];
    send_button.addEventListener("click", () => {
        let talk = document.getElementsByClassName("talk-messages")[0];
        let input = document.getElementsByClassName("message-input")[0];
        if(!(input.value == "")) {
            talk.innerHTML += `<div class="message sent">${input.value}</div>`;
            socket.emit("message", {
                text: input.value,
                session_id: sessionStorage.getItem('user_id'),
                receiver_id: talks[selected_talk].contact_id,
            }, (message) => {
                messagesToTalks(message);
                showCurrentTalks();
                showTalkContent(selected_talk);
            });
        }
        input.value = "";
    });

}