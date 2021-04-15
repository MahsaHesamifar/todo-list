import React from "react";
import "./Todo.css";
import axios from "axios";
import Url from "../../../Urls/Urls";
const Todo = props => {
  // event handler
  const deleteHandler = async () => {
    try {
      const deleteTodoData = await axios.delete(
        `${Url}/todos/${props.todo._id}`,
        {
          headers: {
            Authorization: `Bearer ${props.token}`,
          },
        }
      );
      console.log(deleteTodoData);
      props.setTodos(
        props.todos.filter(el => {
          return el._id !== props.todo._id;
        })
      );
    } catch (error) {
      return alert(error.response);
    }
  };
  const completeHandler = async () => {
    try {
      const checkItemData = await axios.patch(
        `${Url}/todos/${props.todo._id}`,
        { isChecked: !props.todo.isChecked },
        {
          headers: {
            Authorization: `Bearer ${props.token}`,
          },
        }
      );
      console.log(checkItemData);
      props.setTodos(
        props.todos.map(item => {
          if (item._id === props.todo._id)
            return {
              ...item,
              isChecked: !item.isChecked,
            };
          return item;
        })
      );
    } catch (error) {
      console.log(error.response);
    }
  };
  return (
    <div className="todo-block">
      <li className={`todo-item ${props.todo.isChecked ? "completed" : ""}`}>
        {props.todo.description}
      </li>
      <div className="todo-icons">
        <button onClick={completeHandler} className="complete-btn">
          <i className="fas fa-check"></i>
        </button>
        <button onClick={deleteHandler} className="trash-btn">
          <i className="fas fa-trash"></i>
        </button>
      </div>
    </div>
  );
};

export default Todo;
