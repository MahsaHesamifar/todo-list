import React from "react";
import "./TaskAdder.css";

class TaskAdder extends React.Component {
  state = { taskInput: "" };
  onInputChange = e => {
    this.setState({ taskInput: e.target.value });
  };
  onFormSubmit = e => {
    e.preventDefault();
    this.setState({ taskInput: "" });
  };
  render() {
    return (
      <div className="taskadder-container">
        <h1>
          <span className="todo-styling">TODO</span> List
        </h1>

        <form
          action=""
          className="input-container"
          onSubmit={this.onFormSubmit}
        >
          <input
            className="add-task-input"
            type="text"
            placeholder="Add Something To Do..."
            value={this.state.taskInput}
            onChange={this.onInputChange}
          />

          <button type="submit" className="submit-btn">
            <i class="fas fa-plus" aria-hidden="true"></i>
          </button>
        </form>
      </div>
    );
  }
}
export default TaskAdder;
