import axios from "axios";
import React from "react";
import "./TaskAdder.css";
import Url from "../../../Urls/Urls";

class TaskAdder extends React.Component {
  state = { taskInput: "" };
  //event handler
  onFilterChange = e => {
    console.log(e.target.value);
    this.props.onFilterChange(e.target.value);
  };
  state = { taskInput: "" };
  onInputChange = e => {
    this.setState({ taskInput: e.target.value });
  };
  onFormSubmit = async e => {
    e.preventDefault();
    // this.props.onSubmit({
    //   taskTitle: this.state.taskInput,
    //   checked: false,
    //   id: Math.random() * 100,
    // });
    if (this.state.taskInput === "") {
      return alert("No task added!");
    }
    try {
      const submitTaskData = await axios.post(
        `${Url}/todos`,
        {
          name: "todo",
          description: this.state.taskInput,
          isChecked: false,
        },
        {
          headers: {
            Authorization: `Bearer ${this.props.token}`,
          },
        }
      );

      console.log(submitTaskData.data.data._id);
      this.props.onSubmit([
        ...this.props.todos,
        {
          description: this.state.taskInput,
          isChecked: false,
          _id: submitTaskData.data.data._id,
        },
      ]);
      this.setState({ taskInput: "" });
    } catch (error) {
      console.log(error.response);
    }
  };
  render() {
    return (
      <div className="taskadder-container">
        <h1>
          <span className="todo-styling">TODO</span> List
        </h1>

        <form className="input-container" onSubmit={this.onFormSubmit}>
          <input
            className="add-task-input"
            type="text"
            placeholder="Add Something To Do..."
            value={this.state.taskInput}
            onChange={this.onInputChange}
          />

          <button type="submit" className="submit-btn">
            <i className="fas fa-plus" aria-hidden="true"></i>
          </button>
          <select
            value={this.props.selectedOption}
            onChange={this.onFilterChange}
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
  }
}
export default TaskAdder;
