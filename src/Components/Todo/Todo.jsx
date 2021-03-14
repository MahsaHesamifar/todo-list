import React from "react";
import "./Todo.css";

class Todo extends React.Component {
  render() {
    return (
      <div className="todo-block">
        {this.props.taskTitle}
        {this.props.checked}
      </div>
    );
  }
}
export default Todo;
