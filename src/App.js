import "./App.scss";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

// Import pages

import HomePage from "./pages/HomePage";
import GamePage from "./pages/GamePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from "./pages/SignupPage";
import CollectionPage from "./pages/CollectionPage";

// Import components

import Header from "./components/Header";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSearch,
  faCheck,
  faChevronDown,
  faStar,
  faUser,
  faCommentAlt,
} from "@fortawesome/free-solid-svg-icons";
// import { faUser } from "@fortawesome/free-regular-svg-icons";
library.add(faSearch, faCheck, faChevronDown, faStar, faUser, faCommentAlt);

function App() {
  const [userToken, setUserToken] = useState(Cookies.get("token") || null);
  const [username, setUsername] = useState(Cookies.get("username") || null);

  const setConnected = (token, username) => {
    if (token && username) {
      setUserToken(token);
      Cookies.set("token", token);
      setUsername(username);
      Cookies.set("username", username);
    } else {
      setUserToken(null);
      setUsername(null);
      Cookies.remove("token");
      Cookies.remove("username");
    }
  };

  return (
    <div className="app">
      <Router>
        <Header
          setConnected={setConnected}
          userToken={userToken}
          username={username}
        />
        <Switch>
          <Route path="/collection">
            <CollectionPage token={userToken} />
          </Route>
          <Route path="/signup">
            <SignupPage setConnected={setConnected} />
          </Route>
          <Route path="/login">
            <LoginPage setConnected={setConnected} />
          </Route>
          <Route path="/game/:slug">
            <GamePage token={userToken} />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
