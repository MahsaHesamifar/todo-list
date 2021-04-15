import React, { Component } from "react";

import TaskAdder from "./TaskAdder/TaskAdder";
import TodoList from "./TodoList/TodoList";
import "./TodoListApp.css";
import Cookies from "universal-cookie";
import axios from "axios";
import Url from "../../Urls/Urls";

class TodoListApp extends Component {
  state = { todos: [], filteredTodos: [], selectedOption: "all" };
  cookies = new Cookies();
  token = this.cookies.get("token");
  componentDidMount = async () => {
    try {
      const userData = await axios.get(`${Url}/users/me/`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });
      this.props.setUsername(userData.data.data.doc.username);
      this.getTodos();
    } catch (error) {
      console.log(error.response);
    }
  };
  getTodos = async () => {
    const userTodos = await axios.get(`${Url}/todos`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
    // console.log(userTodos.data.todos);
    this.setTodos(userTodos.data.todos);
  };

  componentDidUpdate(prevProps, prevState) {
    // this.filterOptionHandler();
    // In componentDidUpdate we can't call a function(that will rerender a component) without conditions.(error: maximum update depth exceeded)
    if (
      prevState.todos !== this.state.todos ||
      prevState.selectedOption !== this.state.selectedOption
    ) {
      this.filterOptionHandler();
    }
  }
  filterOptionHandler = () => {
    switch (this.state.selectedOption) {
      case "finished":
        this.setState({
          filteredTodos: this.state.todos.filter(
            item => item.isChecked === true
          ),
        });
        break;
      case "unfinished":
        this.setState({
          filteredTodos: this.state.todos.filter(
            item => item.isChecked === false
          ),
        });
        break;
      default:
        this.setState({ filteredTodos: this.state.todos });
        break;
    }
  };
  onFilterChange = option => {
    this.setState({ selectedOption: option });
  };
  setTodos = items => {
    //here 'items' is an array
    // this.setState({ todos: [...this.state.todos, item] });
    this.setState({ todos: items });
  };
  render() {
    return (
      <div>
        <TaskAdder
          token={this.token}
          selectedFilter={this.state.selectedOption}
          todos={this.state.todos}
          onFilterChange={this.onFilterChange}
          onSubmit={this.setTodos}
        />
        <TodoList
          token={this.token}
          setTodos={this.setTodos}
          todos={this.state.todos}
          filteredTodos={this.state.filteredTodos}
        />
      </div>
    );
  }
}
export default TodoListApp;
