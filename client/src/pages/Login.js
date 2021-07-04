import { useHistory } from "react-router-dom";

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

export default Login;