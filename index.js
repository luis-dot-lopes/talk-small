window.onload = () => {
    let send_button = document.getElementsByClassName("message-send")[0];
    send_button.addEventListener("click", () => {
        let talk = document.getElementsByClassName("talk-messages")[0];
        let input = document.getElementsByClassName("message-input")[0];
        if(!(input.value == ""))
        talk.innerHTML += `<div class="message sent">${input.value}</div>`;
        input.value = "";
    });
}