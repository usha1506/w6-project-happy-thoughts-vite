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
    setErrorMessage("");
    setNewHappyThought(message);
  };

  const onFormSubmit = async (event) => {
    event.preventDefault();

    setErrorMessage("");

    if (!newHappyThought) {
      setErrorMessage("Please write your happy thought!");
      return;
    }

    try {
      await postThought({ message: newHappyThought });
      await getThoughtList();
    } catch (error) {
      console.log(error);
      setErrorMessage(
        `Unable to save the happy thoughts for '${newHappyThought}'`
      );
    } finally {
      setNewHappyThought("");
    }
  };

  return (
    <div className="happy-thoughts-wrapper">
      <heading className="happy-thoughts-heading"> Happy Thoughts </heading>
      <HappyThoughtForm
        newThought={newHappyThought}
        errorMessage={errorMessage}
        onNewThoughtChange={handleNewThoughtChange}
        onFormSubmit={onFormSubmit}
      />
      <HappyThoughtList
        loading={loading}
        thoughtList={happyThoughtList}
        setThoughtList={setHappyThoughtList}
      />
    </div>
  );
};
