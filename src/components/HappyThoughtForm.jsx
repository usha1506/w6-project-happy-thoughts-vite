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
        <br></br>
        <br></br>
        <button id="submitButton" type="submit">
          <span className="emoji" aria-label="heart emoji">
            ❤️
          </span>
          {"Send Happy Thought"}
          <span className="emoji" aria-label="heart emoji">
            ❤️
          </span>
        </button>
        {errorMessage && <p className="error"> {errorMessage} </p>}
      </form>
    </div>
  );
};

export default HappyThoughtForm;
