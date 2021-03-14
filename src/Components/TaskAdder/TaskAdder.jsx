import React from "react";
import "./TaskAdder.css";

class TaskAdder extends React.Component {
  state = { taskInput: "" };
  onInputChange = e => {
    this.setState({ taskInput: e.target.value });
  };
  onFormSubmit = e => {
    e.preventDefault();
    this.props.onSubmit({
      taskTitle: this.state.taskInput,
      checked: false,
      id: Math.random() * 100,
    });
    this.setState({ taskInput: "" });
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
          <select name="filter" id="filter" className="filter">
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
