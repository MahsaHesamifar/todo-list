import React from "react";
import Todo from "../Todo/Todo";
import "./TodoList.css";

class TodoList extends React.Component {
  render() {
    const { filteredTodos, setTodos, todos } = this.props;
    return (
      <div className="todo-container">
        {filteredTodos.map(todo => {
          return (
            <Todo
              todos={todos}
              setTodos={setTodos}
              todo={todo}
              key={todo.id}
              // taskTitle={todo.taskTitle}
              // checked={todo.checked}
              // id={todo.id}
            />
          );
        })}
      </div>
    );
  }
}
export default TodoList;
