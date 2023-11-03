import { useEffect, useState } from "react";
import HappyThoughtForm from "./HappyThoughtForm";
import HappyThoughtList from "./HappyThoughtList";
import { getThoughts, postThought } from "../apis/fetchThoughts";

export const HappyThoughts = () => {
  const [happyThoughtList, setHappyThoughtList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newHappyThought, setNewHappyThought] = useState("");

  const getThoughtList = async () => {
    setLoading(true);

    try {
      const data = await getThoughts();
      setHappyThoughtList(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getThoughtList();
  }, []);

  const handleNewTodoChange = (event) => {
    setNewHappyThought(event.target.value);
  };

  const onFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await postThought({ message: newHappyThought });
      await getThoughtList();
    } catch (error) {
      console.error(error);
    } finally {
      setNewHappyThought("");
    }
  };

  return (
    <div>
      <HappyThoughtForm
        newThought={newHappyThought}
        onNewThoughtChange={handleNewTodoChange}
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
