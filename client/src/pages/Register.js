import { useHistory } from "react-router-dom";

import './styles/style.acess.css';

function Register() {

    const history = useHistory();

    function goToLogin() {
        history.push("/");
    }

    async function makeRegisterRequest() {

        const email = document.querySelector("#email").value;
        const password = document.querySelector("#password").value;
        const confirm_password = document.querySelector("#password-verify").value;
        const username = document.querySelector("#username").value;
        const error_label = document.querySelector("#error");
        const email_regex = /^\S+@\S+$/;

        if(password != confirm_password) {
            error_label.textContent = "The passwords should be equal";
            error_label.style = "color: red;";
            return;
        } else if(password.length < 5) {
            error_label.textContent = "The password should be at least five characters long";
            error_label.style = "color: red;";
            return;
        } else if(!email_regex.test(email)) {
            error_label.textContent = "Email is invalid";
            error_label.style = "color: red;";
            return;
        } else {
            error_label.style = "visibility: hidden;";
        }

        const headers = new Headers({ "Content-Type": "application/json" });
        const req = await fetch("http://localhost:3001/signup", 
            { method: "POST", headers, body: JSON.stringify({ email, password, username }) });
        
        const json = await req.json();

        if(json.user_id) {
            window.sessionStorage.setItem("user_id", json.user_id);
            history.push("/talks");
        } else {
            document.querySelector("#error").style = "color: red;";
            document.querySelector("#error").textContent = json.message;
        }

    }

    return (
        <div>
            <div className="register">
                <img src="images/talk-small-logo.png" alt="talk-small-logo" className="logo" draggable="false" />
                <form action="" id="form">
                        <input
                            type="email"
                            id="email"
                            className="email"
                            spellcheck="false"
                            placeholder="Your email adress*"
                            autoComplete="off"
                        />
                        <input
                            type="text"
                            id="username"
                            className="username"
                            spellcheck="false"
                            placeholder="Username*"
                            autoComplete="off"
                        />
                        <input
                            type="password"
                            id="password"
                            className="password"
                            spellcheck="false"
                            placeholder="Your password*"
                        />
                        <input
                            type="password"
                            id="password-verify"
                            className="password-verify"
                            spellcheck="false"
                            placeholder="Verify your password*"
                        />
                        <input
                            type="button"
                            value="Register"
                            className="submit"
                            onClick={makeRegisterRequest}
                        />
                        <p id="error" style={{ visibility: 'hidden' }}>
                            Invalid email or password
                        </p>
                </form>
            </div>
            <div className="alert">
                Have account?
                <button onClick={goToLogin} className="alternate">Sign in</button>
            </div>
        </div>
    );
}

export default Register;