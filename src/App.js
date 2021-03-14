import React from "react";
import TaskAdder from "./Components/TaskAdder/TaskAdder";
import "./App.css";
import TodoList from "./Components/TodoList/TodoList";

class App extends React.Component {
  state = { todos: [] };
  onItemSubmit = item => {
    this.setState({ todos: [...this.state.todos, item] });
  };
  render() {
    return (
      <div>
        <TaskAdder onSubmit={this.onItemSubmit} />
        <TodoList todos={this.state.todos} />
      </div>
    );
  }
}
export default App;
