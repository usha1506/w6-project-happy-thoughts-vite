import { formatRelative } from "date-fns";
import "./HappyThoughts.css";

const HappyThoughtList = ({ loading, thoughtList, setThoughtList }) => {
  if (loading) {
    return <h1>Loading in progress...</h1>;
  }

  const onTaskCheckChange = (task) => {
    // update a state object
    /* updatedTask is a new object that is the same as the task object except for the isChecked property, 
    which is toggled from true to false or from false to true. 
    This code is often used to update a property of an object while preserving the rest of its properties. */
    const updatedTask = { ...task, isChecked: !task.isChecked };

    // Make a POST request here with the updated task isChecked value
    fetch(`https://week-7-backend.onrender.com/tasks/${task._id}/check`, {
      method: "POST",
      headers: { updatedTask, "Content-Type": "application/json" },
      body: JSON.stringify({
        isChecked: updatedTask.isChecked,
      }),
    })
      .then((response) => response.json())
      .catch((error) => {
        console.log(error);
        // Handle network or other errors
      });

    // Update the task list in the state
    // Use .map to update the specific task if found, otherwise return it unchanged
    setThoughtList((taskList) =>
      taskList.map((singleTask) =>
        singleTask._id === task._id ? updatedTask : singleTask
      )
    );
  };

  return (
    <section>
      {thoughtList
        .map((thought) => (
          <div key={thought._id} className="task">
            <input
              onChange={() => onTaskCheckChange(thought)}
              type="checkbox"
              checked={thought.isChecked}
            />
            <h4>{thought.message}</h4>
            {/* <p>{formatRelative(thought.createdAt, new Date())}</p> */}
          </div>
        ))
        .reverse()
        .slice(0, 20)}
    </section>
  );
};

export default HappyThoughtList;
