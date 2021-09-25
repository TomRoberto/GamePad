import "./review-page.scss";
import axios from "axios";
import { useState } from "react";
import { useLocation, useHistory } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ReviewPage = ({ token }) => {
  const [title, setTitle] = useState();
  const [text, setText] = useState();

  const history = useHistory();
  const location = useLocation();
  const gameData = location.state.gameData;

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post(
        "http://localhost:4000/review/create",
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
    } catch (error) {
      console.log(error.response);
    }
  };
  return (
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
  );
};

export default ReviewPage;
