//Talks will be hardcoded for testing
let talks = {
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

const showTalkContent = () => {
    
}

window.onload = () => {
    //Loading the interface
    showCurrentTalks();

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