
import './styles/login.css';

function Login() {
    return (
        <div className="login">
            <img src="images/logo.png" alt="talk-small-logo" class="logo" /><br></br>
            <form action="">
                <input
                type="text"
                id="email"
                class="email"
                name="email"
                placeholder="Email*"
                autoComplete="off"
                required
                /><br></br>
                <input
                type="password"
                name="password"
                id="password"
                class="password"
                placeholder="Password*"
                autoComplete="off"
                required
                /><br></br>
                <p id="error" style={{visibility: 'hidden'}}>
                Invalid email or password
                </p>
                <input type="button" value="Login" class="submit" onClick="makeRequest()" />
            </form>
            <div class="alert">
                Don't have a account?
                <a class="register" href="./register.html">Sign up</a>
            </div>
        </div>
    );
}

export default Login;
