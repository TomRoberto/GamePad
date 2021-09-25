import "./App.scss";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
import { ToastContainer } from "react-toastify";

// Import pages

import HomePage from "./pages/HomePage";
import GamePage from "./pages/GamePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from "./pages/SignupPage";
import CollectionPage from "./pages/CollectionPage";
import ReviewPage from "./pages/ReviewPage";

// Import components

import Header from "./components/Header";
import Footer from "./components/Footer";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSearch,
  faCheck,
  faChevronDown,
  faStar,
  faUser,
  faCommentAlt,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
// import { faUser } from "@fortawesome/free-regular-svg-icons";
library.add(
  faSearch,
  faCheck,
  faChevronDown,
  faStar,
  faUser,
  faCommentAlt,
  faTimes
);

function App() {
  const [userToken, setUserToken] = useState(Cookies.get("token") || null);
  const [userId, setUserId] = useState(Cookies.get("userId") || null);

  const setConnected = (token, userId) => {
    if (token && userId) {
      setUserToken(token);
      Cookies.set("token", token);
      setUserId(userId);
      Cookies.set("userId", userId);
    } else {
      setUserToken(null);
      setUserId(null);
      Cookies.remove("token");
      Cookies.remove("userId");
    }
  };

  return (
    <div className="app">
      <Router>
        <Header
          setConnected={setConnected}
          userToken={userToken}
          // username={username}
        />
        <Switch>
          <Route path="/review">
            <ReviewPage token={userToken} />
          </Route>
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
            <GamePage token={userToken} userId={userId} />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
        <Footer />
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
