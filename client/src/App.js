import { BrowserRouter, Route } from "react-router-dom";

import Talks from "./pages/Talks";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Login}/>
      <Route path="/register" component={Register}/>
      <Route path="/talks" component={Talks} />
    </BrowserRouter>
  );
}

export default App;
