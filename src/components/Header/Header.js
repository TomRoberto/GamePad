import "./header.scss";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";

const Header = ({ setConnected, userToken, username }) => {
  return (
    <div className="header">
      <div className="container">
        <div>
          <Link to="/" className="link-home">
            <img src={logo} alt="" />
            <p>GamePad</p>
          </Link>
        </div>
        <div>
          <Link to={userToken ? "/collection" : "/login"}>
            <button className="collection">My Collection</button>
          </Link>
          {userToken ? (
            <>
              <p
                onClick={() => {
                  setConnected(null, null);
                }}
                className="login"
              >
                Log Out
              </p>
            </>
          ) : (
            <Link to="/login">
              <button className="login">Login</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
