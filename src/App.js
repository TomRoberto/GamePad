import "./App.scss";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

// Import pages

import HomePage from "./pages/HomePage";
import GamePage from "./pages/GamePage";

// Import components

import Header from "./components/Header";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/game">
          <GamePage />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
