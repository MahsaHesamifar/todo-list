import React from "react";
import Todo from "../Todo/Todo";
import "./TodoList.css";

class TodoList extends React.Component {
  render() {
    return (
      <div className="todo-container">
        {this.props.todos.map(todo => {
          return (
            <Todo
              taskTitle={todo.taskTitle}
              checked={todo.checked}
              id={todo.id}
              key={todo.id}
            />
          );
        })}
      </div>
    );
  }
}
export default TodoList;
