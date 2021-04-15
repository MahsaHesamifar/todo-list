import React, { useEffect, useState, Component } from "react";

import TaskAdder from "./TaskAdder/TaskAdder";
import TodoList from "./TodoList/TodoList";
import "./TodoListApp.css";
import Cookies from "universal-cookie";
import axios from "axios";
import Url from "../../Urls/Urls";

const TodoListApp = props => {
  //states:
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [selectedOption, setSelectedOption] = useState("all");

  const cookies = new Cookies();
  const token = cookies.get("token");

  // componentDidMount -> useEffect:
  useEffect(async () => {
    try {
      const userData = await axios.get(`${Url}/users/me/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      props.setUsername(userData.data.data.doc.username);
      getTodos();
    } catch (error) {
      console.log(error.response);
    }
  }, []);

  const getTodos = async () => {
    const userTodos = await axios.get(`${Url}/todos`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(userTodos.data.todos);
    setTodos(userTodos.data.todos);
  };

  //componentDidUpdate:
  useEffect(() => {
    filterOptionHandler();
  }, [todos, selectedOption]);

  const filterOptionHandler = () => {
    switch (selectedOption) {
      case "finished":
        setFilteredTodos(todos.filter(item => item.isChecked === true));

        break;
      case "unfinished":
        setFilteredTodos(todos.filter(item => item.isChecked === false));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  };
  const onFilterChange = option => {
    setSelectedOption(option);
  };
  return (
    <div>
      <TaskAdder
        token={token}
        selectedFilter={selectedOption}
        todos={todos}
        onFilterChange={onFilterChange}
        onSubmit={setTodos}
      />
      <TodoList
        token={token}
        setTodos={setTodos}
        todos={todos}
        filteredTodos={filteredTodos}
      />
    </div>
  );
};
export default TodoListApp;
