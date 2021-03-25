import React from "react";
import "./Todo.css";

class Todo extends React.Component {
  // event handler
  deleteHandler = () => {
    this.props.setTodos(
      this.props.todos.filter(el => {
        return el.id !== this.props.todo.id;
      })
    );
  };
  completeHandler = () => {
    this.props.setTodos(
      this.props.todos.map(item => {
        if (item.id === this.props.todo.id)
          return {
            ...item,
            checked: !item.checked,
          };
        return item;
      })
    );
  };
  render() {
    return (
      <div className="todo-block">
        <li
          className={`todo-item ${this.props.todo.checked ? "completed" : ""}`}
        >
          {this.props.todo.taskTitle}
        </li>
        <div className="todo-icons">
          <button onClick={this.completeHandler} className="complete-btn">
            <i className="fas fa-check"></i>
          </button>
          <button onClick={this.deleteHandler} className="trash-btn">
            <i className="fas fa-trash"></i>
          </button>
        </div>
      </div>
    );
  }
}
export default Todo;
