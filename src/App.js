import React, { Component } from 'react';
import TaskList from './components/TaskList/TaskList';
import NewTaskForm from './components/NewTaskForm/NewTaskForm';
import Footer from './components/Footer/Footer';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      filter: 'all',
    };
  }

  addTask = (description) => {
    const newTask = {
      id: Date.now(),
      description,
      completed: false,
      createdAt: new Date(),
    };

    this.setState(({ tasks }) => ({
      tasks: [...tasks, newTask],
    }));
  };

  toggleComplete = (id) => {
    this.setState(({ tasks }) => ({
      tasks: tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    }));
  };

  editTask = (id, newDescription) => {
    this.setState(({ tasks }) => ({
      tasks: tasks.map((task) =>
        task.id === id ? { ...task, description: newDescription } : task,
      ),
    }));
  };

  deleteTask = (id) => {
    this.setState(({ tasks }) => ({
      tasks: tasks.filter((task) => task.id !== id),
    }));
  };

  changeFilter = (filter) => {
    this.setState({ filter });
  };

  clearCompleted = () => {
    this.setState(({ tasks }) => ({
      tasks: tasks.filter((task) => !task.completed),
    }));
  };

  getFilteredTasks = () => {
    const { tasks, filter } = this.state;
    switch (filter) {
      case 'active':
        return tasks.filter((task) => !task.completed);
      case 'completed':
        return tasks.filter((task) => task.completed);
      default:
        return tasks;
    }
  };

  render() {
    const { tasks, filter } = this.state;
    const filteredTasks = this.getFilteredTasks();
    const tasksLeft = tasks.filter((task) => !task.completed).length;

    return (
      <section className="todoapp">
        <NewTaskForm addTask={this.addTask} />
        <TaskList
          tasks={filteredTasks}
          toggleComplete={this.toggleComplete}
          deleteTask={this.deleteTask}
          editTask={this.editTask}
        />
        <Footer
          tasksLeft={tasksLeft}
          changeFilter={this.changeFilter}
          activeFilter={filter}
          clearCompleted={this.clearCompleted}
        />
      </section>
    );
  }
}

export default App;
