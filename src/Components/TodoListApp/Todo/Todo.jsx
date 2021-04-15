import React from "react";
import "./Todo.css";
import axios from "axios";
import Url from "../../../Urls/Urls";
class Todo extends React.Component {
  // event handler
  deleteHandler = async () => {
    try {
      const deleteTodoData = await axios.delete(
        `${Url}/todos/${this.props.todo._id}`,
        {
          headers: {
            Authorization: `Bearer ${this.props.token}`,
          },
        }
      );
      console.log(deleteTodoData);
      this.props.setTodos(
        this.props.todos.filter(el => {
          return el._id !== this.props.todo._id;
        })
      );
    } catch (error) {
      return alert(error.response);
    }
  };
  completeHandler = async () => {
    try {
      const checkItemData = await axios.patch(
        `${Url}/todos/${this.props.todo._id}`,
        { isChecked: !this.props.todo.isChecked },
        {
          headers: {
            Authorization: `Bearer ${this.props.token}`,
          },
        }
      );
      console.log(checkItemData);
      this.props.setTodos(
        this.props.todos.map(item => {
          if (item._id === this.props.todo._id)
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
  render() {
    return (
      <div className="todo-block">
        <li
          className={`todo-item ${
            this.props.todo.isChecked ? "completed" : ""
          }`}
        >
          {this.props.todo.description}
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
