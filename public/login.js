
const makeRequest = async () => {

    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    const headers = new Headers({"Content-Type": "application/json"});
    const req = await fetch("/login", 
        { method: "POST", headers, body: JSON.stringify({ email, password }) });

    const json = await req.json();

    if(json.user_id) {
        window.sessionStorage.setItem("user_id", json.user_id);
        window.sessionStorage.setItem("raw_id", json.raw_id);

        window.location = "/talks";
    } else {
        document.querySelector("#error").style = "color: red;";
    }
};
