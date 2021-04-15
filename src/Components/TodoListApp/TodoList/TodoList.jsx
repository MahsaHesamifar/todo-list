import React from "react";
import Todo from "../Todo/Todo";
import "./TodoList.css";

const TodoList = props => {
  // const { filteredTodos, setTodos, todos } = props;
  return (
    <div className="todo-container">
      {props.filteredTodos.map(todo => {
        return (
          <Todo
            token={props.token}
            todos={props.todos}
            setTodos={props.setTodos}
            todo={todo}
            key={todo._id}
          />
        );
      })}
    </div>
  );
};

export default TodoList;
