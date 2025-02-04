const HappyThoughtForm = ({
  newThought,
  errorMessage,
  onNewThoughtChange,
  onFormSubmit,
}) => {
  const handleNewThoughtChange = (event) => {
    onNewThoughtChange(event.target.value);
  };

  return (
    <div className="happy-thought-submit-form-wrapper">
      <h2>What is making you happy right now?</h2>
      <form onSubmit={onFormSubmit}>
        <textarea
          id="textArea"
          rows="3"
          placeholder="React is making me happy!"
          value={newThought}
          onChange={handleNewThoughtChange}
        ></textarea>
        <div className="text-area-length-wrapper">
          <p className="error"> {errorMessage} </p>
          <p
            className={
              "text-area-length " + (newThought.length > 140 ? "red" : "")
            }
          >
            {newThought.length}/140
          </p>
        </div>
        <button id="submitButton" type="submit">
          <span className="heart-emoji" aria-label="heart emoji">
            ❤️
          </span>
          {"Send Happy Thought"}
          <span className="heart-emoji" aria-label="heart emoji">
            ❤️
          </span>
        </button>
      </form>
    </div>
  );
};

export default HappyThoughtForm;
