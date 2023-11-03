const HappyThoughtForm = ({ newThought, onNewThoughtChange, onFormSubmit }) => {
  const handleNewThoughtChange = (event) => {
    onNewThoughtChange(event.target.value);
  };

  return (
    <div className="happy-thought-submit-form-wrapper">
      <h2>What is making you happy right now?</h2>
      <form onSubmit={onFormSubmit}>
        <textarea
          rows="3"
          placeholder="React is making me happy!"
          value={newThought}
          onChange={handleNewThoughtChange}
        ></textarea>
        <button id="submitButton" type="submit">
          <div id="heartLabel">❤️ Send Happy Thought ❤️</div>
        </button>
      </form>
    </div>
  );
};

export default HappyThoughtForm;
