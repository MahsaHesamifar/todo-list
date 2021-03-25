import React from "react";
import TaskAdder from "./Components/TaskAdder/TaskAdder";
import "./App.css";
import TodoList from "./Components/TodoList/TodoList";

class App extends React.Component {
  state = { todos: [], filteredTodos: [], selectedOption: "all" };

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
          filteredTodos: this.state.todos.filter(item => item.checked === true),
        });
        break;
      case "unfinished":
        this.setState({
          filteredTodos: this.state.todos.filter(
            item => item.checked === false
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
          selectedFilter={this.state.selectedOption}
          todos={this.state.todos}
          onFilterChange={this.onFilterChange}
          onSubmit={this.setTodos}
        />
        <TodoList
          setTodos={this.setTodos}
          todos={this.state.todos}
          filteredTodos={this.state.filteredTodos}
        />
      </div>
    );
  }
}
export default App;
