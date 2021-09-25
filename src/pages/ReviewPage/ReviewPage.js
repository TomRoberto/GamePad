import "./review-page.scss";
import axios from "axios";
import { useState } from "react";
import { useLocation, useHistory, Redirect } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import notify from "../../components/ReactToastify";

const ReviewPage = ({ token }) => {
  const [title, setTitle] = useState();
  const [text, setText] = useState();

  const history = useHistory();
  const location = useLocation();
  let gameData = 0;
  if (location.state) {
    gameData = location.state.gameData;
  }

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post(
        "https://gamepad-tom-roberto.herokuapp.com/review/create",
        {
          text,
          title,
          gameData,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response) {
        notify("Review saved", "green-toastify");
        history.goBack();
      }
    } catch (error) {
      console.log(error.response);
    }
  };
  return token ? (
    <div className="review-page">
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="up-part">
            <h1>Write a Review</h1>
            <FontAwesomeIcon
              icon="times"
              onClick={() => {
                history.goBack();
              }}
            />
          </div>

          <div>
            <h2>Review title</h2>
            <input
              className="text-input"
              type="text"
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
          </div>
          <div>
            <h2>Review text</h2>
            <textarea
              onChange={(event) => {
                setText(event.target.value);
              }}
            />
          </div>
          <div>
            <input type="submit" className="submit" />
          </div>
        </form>
      </div>
    </div>
  ) : (
    <Redirect to="/" />
  );
};

export default ReviewPage;
