import "./login-page.scss";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import notify from "../../components/ReactToastify";

const LoginPage = ({ setConnected }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "https://gamepad-tom-roberto.herokuapp.com/login",
        {
          email,
          password,
        }
      );
      if (response.data.token) {
        setConnected(response.data.token, response.data.id);
        notify("You are now connected", "green-toastify");
        // alert("You are now connected");
        history.push("/");
      }
    } catch (error) {
      console.log(error.response.data.error.message);
      notify(error.response.data.error.message, "red-toastify");
    }
  };
  return (
    <div className="login-page">
      <div className="container">
        <div className="sections">
          <section>
            <h1>How it works ?</h1>
            <div>
              <div className="icon-text">
                <FontAwesomeIcon icon="user" />
                <p>
                  Log in to your free account to be able to get all features of
                  Gamepad
                </p>
              </div>
              <div className="icon-text">
                <FontAwesomeIcon icon="star" />
                <p>Add a game to your collection</p>
              </div>
              <div className="icon-text">
                <FontAwesomeIcon icon="comment-alt" />
                <p>Leave a review for a game</p>
              </div>
            </div>
          </section>
          <section>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <input type="submit" value="Connexion" />
            </form>
            <Link to="/signup" className="signup">
              Don't have an account yet ?
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
