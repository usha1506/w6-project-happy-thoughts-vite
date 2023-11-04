import { useState } from "react";

import moment from "moment";

import "./HappyThoughts.css";
import { postLike } from "../apis/fetchThoughts";

const HappyThoughtList = ({ loading, thoughtList, setThoughtList }) => {
  const [errorMessage, setErrorMessage] = useState("");

  if (loading) {
    return <h1>Loading in progress...</h1>;
  }

  const handleLikeButtonClick = (thought) => {
    setErrorMessage("");

    postLike(thought._id).catch((error) => setErrorMessage(error.message));

    setThoughtList((prevList) =>
      prevList.map((prevThought) =>
        prevThought._id === thought._id
          ? { ...prevThought, hearts: thought.hearts + 1 }
          : prevThought
      )
    );
  };

  return (
    <section>
      {thoughtList
        .map((thought) => (
          <section key={thought._id} className="happy-thought-item">
            <p>{thought.message}</p>
            <div className="info-wrapper">
              <div className="info-like">
                <button
                  id="likeButton"
                  aria-labelledby="heartLabel"
                  className="like-button"
                  onClick={() => handleLikeButtonClick(thought)}
                >
                  <div id="heartLabel">❤️</div>
                </button>
                <span className="like-count">x{thought.hearts}</span>
              </div>
              <p>{moment(new Date(thought.createdAt)).fromNow()}</p>
            </div>
            {errorMessage && <p className="error"> {errorMessage} </p>}
          </section>
        ))
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 20)}
    </section>
  );
};

export default HappyThoughtList;
