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
    <section className="happy-thought-list">
      {thoughtList
        .map((thought) => (
          <section key={thought._id} className="happy-thought-item">
            <p>{thought.message}</p>
            <div className="happy-thought-item-details-wrapper">
              <div>
                <button
                  id="likeButton"
                  aria-labelledby="heartDiv"
                  onClick={() => handleLikeButtonClick(thought)}
                >
                  <div id="heartDiv">❤️</div>
                </button>
                <span className="happy-thought-like-count">
                  x{thought.hearts}
                </span>
              </div>
              <span className="happy-thought-created-time">
                {moment(new Date(thought.createdAt)).fromNow()}
              </span>
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
