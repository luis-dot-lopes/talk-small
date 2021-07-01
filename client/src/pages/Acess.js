import { useHistory } from "react-router-dom";
import { createSemanticDiagnosticsBuilderProgram } from "typescript";

import './styles/style.acess.css';

function Login() {

    const history = useHistory();

    function goToRegister() {
        history.push("/register");
    }

    async function makeLoginRequest() {

        const email = document.querySelector("#email").value;
        const password = document.querySelector("#password").value;

        const headers = new Headers({ "Content-Type": "application/json" });
        const req = await fetch("http://localhost:3001/login",
            { method: "POST", headers, body: JSON.stringify({ email, password }) });

        const json = await req.json();

        if (json.user_id) {
            window.sessionStorage.setItem("user_id", json.user_id);
            window.sessionStorage.setItem("raw_id", json.raw_id);

            history.push("/talks");
        } else {
            document.querySelector("#error").style = "color: red;";
        }

    }

    return (
        <div className="login">
            <img src="images/talk-small-logo.png" alt="talk-small-logo" className="logo" draggable="false" />
            <form action="" id="form">
                <input
                    type="text"
                    id="email"
                    className="email"
                    name="email"
                    placeholder="Email*"
                    autoComplete="off"
                    required
                />
                <input
                    type="password"
                    name="password"
                    id="password"
                    className="password"
                    placeholder="Password*"
                    autoComplete="off"
                    required
                />
                <p id="error" style={{ visibility: 'hidden' }}>
                    Invalid email or password
                </p>
                <input type="button" value="Login" className="submit" onClick={makeLoginRequest} />
            </form>
            <div className="alert">
                Don't have a account?
                <button onClick={goToRegister} className="alternate">Sign up</button>
            </div>
        </div>
    );
}

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

        if(password != confirm_password) {
            const error_label = document.querySelector("#error");
            error_label.textContent = "The passwords should be equal";
            error_label.style = "color: red;";
            return;
        } else if(password.length < 5) {
            const error_label = document.querySelector("#error");
            error_label.textContent = "The password should be at least five characters long";
            error_label.style = "color: red;";
            return;
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

export {Register, Login};