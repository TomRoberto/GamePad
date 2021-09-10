import "./App.scss";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

// Import pages

import HomePage from "./pages/HomePage";

// Import components

import Header from "./components/Header";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
