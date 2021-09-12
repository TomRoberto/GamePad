import "./header.scss";
import { Link } from "react-router-dom";

const Header = ({ setConnected, userToken, username }) => {
  return (
    <div>
      <p>GAMEPAD</p>
      <div>
        <button>My Collection</button>
        {userToken ? (
          <Link>
            <p>{username}</p>
          </Link>
        ) : (
          <Link to="/login">
            <button>Login</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
