
import './styles/login.css';

const makeRequest = async () => {

    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    const headers = new Headers({"Content-Type": "application/json"});
    const req = await fetch("http://localhost:3001/login", 
        { method: "POST", headers, body: JSON.stringify({ email, password }) });

    const json = await req.json();

    if(json.user_id) {
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
            <img src="images/logo.png" alt="talk-small-logo" class="logo" /><br></br>
            <form action="">
                <input
                type="text"
                id="email"
                className="email"
                name="email"
                placeholder="Email*"
                autoComplete="off"
                required
                /><br></br>
                <input
                type="password"
                name="password"
                id="password"
                className="password"
                placeholder="Password*"
                autoComplete="off"
                required
                /><br></br>
                <p id="error" style={{visibility: 'hidden'}}>
                Invalid email or password
                </p>
                <input type="button" value="Login" className="submit" onClick={makeRequest} />
            </form>
            <div class="alert">
                Don't have a account?
                <a className="register" href="./register.html">Sign up</a>
            </div>
        </div>
    );
}

export default Login;
