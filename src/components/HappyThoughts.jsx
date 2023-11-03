import { useEffect, useState } from "react";
import HappyThoughtForm from "./HappyThoughtForm";
import HappyThoughtList from "./HappyThoughtList";
import { getThoughts, postThought } from "../apis/fetchThoughts";

export const HappyThoughts = () => {
  const [happyThoughtList, setHappyThoughtList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newHappyThought, setNewHappyThought] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const getThoughtList = async () => {
    setLoading(true);

    try {
      const data = await getThoughts();
      setHappyThoughtList(data);
    } catch (error) {
      console.log(error);
      setErrorMessage("Error occurred while loading thoughts!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getThoughtList();
  }, []);

  const handleNewThoughtChange = (message) => {
    setNewHappyThought(message);
  };

  const onFormSubmit = async (event) => {
    event.preventDefault();

    setErrorMessage("");

    try {
      await postThought({ message: newHappyThought });
      await getThoughtList();
    } catch (error) {
      console.log(error);
      setErrorMessage(
        `Unable to post the happy thoughts for '${newHappyThought}'`
      );
    } finally {
      setNewHappyThought("");
    }
  };

  return (
    <div>
      <HappyThoughtForm
        newThought={newHappyThought}
        onNewThoughtChange={handleNewThoughtChange}
        onFormSubmit={onFormSubmit}
      />
      {errorMessage && <p className="error"> {errorMessage} </p>}
      <HappyThoughtList
        loading={loading}
        thoughtList={happyThoughtList}
        setThoughtList={setHappyThoughtList}
      />
    </div>
  );
};
