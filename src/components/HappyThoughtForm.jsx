const HappyThoughtForm = ({ newThought, onNewThoughtChange, onFormSubmit }) => {
  return (
    <form onSubmit={onFormSubmit}>
      <h1>Welcome to happy thoughts app! Type new thought below.</h1>
      <textarea value={newThought} onChange={onNewThoughtChange} />
      <button type="submit">Submit form!</button>
    </form>
  );
};

export default HappyThoughtForm;
