import './styles/style.acess.css';

const makeLoginRequest = async () => {

    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    const headers = new Headers({ "Content-Type": "application/json" });
    const req = await fetch("http://localhost:3001/login",
        { method: "POST", headers, body: JSON.stringify({ email, password }) });

    const json = await req.json();

    if (json.user_id) {
        window.sessionStorage.setItem("user_id", json.user_id);
        window.sessionStorage.setItem("raw_id", json.raw_id);
        window.location.reload();
    } else {
        document.querySelector("#error").style = "color: red;";
    }

};

function Login() {
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
                <button className="alternate">Sign up</button>
            </div>
        </div>
    );
}

const makeRegisterRequest = async () => {

    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    const username = document.querySelector("#username").value;

    const headers = new Headers({ "Content-Type": "application/json" });
    const req = await fetch("http://localhost:3001/signup", 
        { method: "POST", headers, body: JSON.stringify({ email, password, username }) });
    
    const json = await req.json();

    if(json.user_id) {
        window.sessionStorage.setItem("user_id", json.user_id);

        window.location = "/talks";
    } else {
        document.querySelector("#error").style = "color: red;";
    }

}

function Register() {
    return (
        <>
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
                </form>
            </div>
            <div className="alert">
                Have account?
                <button className="alternate">Sign in</button>
            </div>
        </>
    );
}

export {Register, Login};