import "./signup-page.scss";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";

const SignupPage = ({ setConnected }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState();

  const [username, setUsername] = useState("");

  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/signup", {
        email,
        password,
        username,
      });
      if (response.data.token) {
        setConnected(response.data.token, response.data.username);
        alert("You are now connected");
        history.push("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <div>
        <section>
          <h1>How it works ?</h1>
          <div>
            <p>
              Log in to your free account to be able to get all features of
              Gamepad
            </p>
            <p>Add a game to your collection</p>
            <p>Leave a review for a game</p>
          </div>
        </section>
        <section>
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
            <input
              type="text"
              placeholder="Username"
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(event) => setPassword(event.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              onChange={(event) => {
                setConfirmPassword(event.target.value);
              }}
            />
            <input type="submit" value="Connexion" />
          </form>
          <Link to="/login">Already have an account ?</Link>
        </section>
      </div>
    </div>
  );
};

export default SignupPage;
