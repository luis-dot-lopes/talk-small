//Talks will be hardcoded for testing
const talks = {
    'John' : [
        ['sent', "Hello John."],
        ['received', "Hello Luis. What's up?"],
        ['sent', "I'm good, how about you?"],
        ['received', "I'm doing well."]
    ],
    'Alice' : [
        ['received', "Hi there Luis"],
        ['sent', "Hello Alice. How are you doing?"],
        ['received', "Good. Eating a lot of cakes"],
        ['received', "And you? Still working on that app."],
        ['sent', "Yeah. It's gonna be superb, super cool really"]
    ],
    'Hannah' : [
        ['received', "Hey, are you good?"],
        ['sent', "Hey Hannah. Yes, I'm well"],
        ['received', "Ok. Bye"]
    ]
};
let selected_talk = 'John';

//load talks on nav
const showCurrentTalks = () => {
    let nav = document.getElementsByTagName('nav')[0];
    for(talk_name in talks) {
        console.log(talk_name); 
        let talk = talks[talk_name];
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
        nav.appendChild(talk_div);
    }
}

const showTalkContent = (talk_name) => {

    let talk = talks[talk_name];
    let talk_content = document.getElementsByClassName('talk-content')[0];

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
    for(message of talk) {
        let message_div = document.createElement('div');
        message_div.className = `message ${message[0]}`;
        message_div.textContent = message[1];
        talk_messages.appendChild(message_div);
    }

    talk_content.appendChild(talk_header);
    talk_content.appendChild(talk_messages);

}

window.onload = () => {
    //Loading the interface
    showCurrentTalks();
    showTalkContent(selected_talk);

    //setting up the 'Send' button
    let send_button = document.getElementsByClassName("message-send")[0];
    send_button.addEventListener("click", () => {
        let talk = document.getElementsByClassName("talk-messages")[0];
        let input = document.getElementsByClassName("message-input")[0];
        if(!(input.value == ""))
        talk.innerHTML += `<div class="message sent">${input.value}</div>`;
        input.value = "";
    });
}