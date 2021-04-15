import axios from "axios";
import React, { useState } from "react";
import "./TaskAdder.css";
import Url from "../../../Urls/Urls";

const TaskAdder = props => {
  //states:
  const [taskInput, setTaskInput] = useState("");
  //event handler
  const onFilterChange = e => {
    console.log(e.target.value);
    props.onFilterChange(e.target.value);
  };
  const onInputChange = e => {
    setTaskInput(e.target.value);
  };
  const onFormSubmit = async e => {
    e.preventDefault();
    if (taskInput === "") {
      return alert("No task added!");
    }
    try {
      const submitTaskData = await axios.post(
        `${Url}/todos`,
        {
          name: "todo",
          description: taskInput,
          isChecked: false,
        },
        {
          headers: {
            Authorization: `Bearer ${props.token}`,
          },
        }
      );

      console.log(submitTaskData.data.data._id);
      props.onSubmit([
        ...props.todos,
        {
          description: taskInput,
          isChecked: false,
          _id: submitTaskData.data.data._id,
        },
      ]);
      setTaskInput("");
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div className="taskadder-container">
      <h1>
        <span className="todo-styling">TODO</span> List
      </h1>

      <form className="input-container" onSubmit={onFormSubmit}>
        <input
          className="add-task-input"
          type="text"
          placeholder="Add Something To Do..."
          value={taskInput}
          onChange={onInputChange}
        />

        <button type="submit" className="submit-btn">
          <i className="fas fa-plus" aria-hidden="true"></i>
        </button>
        <select
          value={props.selectedOption}
          onChange={onFilterChange}
          name="filter"
          id="filter"
          className="filter"
        >
          <option value="all">All</option>
          <option value="finished">Finished</option>
          <option value="unfinished">Unfinished</option>
        </select>
      </form>
    </div>
  );
};

export default TaskAdder;
