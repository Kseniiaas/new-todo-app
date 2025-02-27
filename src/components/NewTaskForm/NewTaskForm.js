import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './NewTaskForm.css';

class NewTaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = { description: '', minutes: '', seconds: '' };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { description, minutes, seconds } = this.state;
    const { addTask } = this.props;

    if (description.trim()) {
      addTask(
        description,
        parseInt(minutes, 10) || 0,
        parseInt(seconds, 10) || 0,
      );
      this.setState({ description: '', minutes: '', seconds: '' });
    }
  };

  render() {
    const { description, minutes, seconds } = this.state;
    return (
      <header className="header">
        <h1>todos</h1>
        <form className="new-todo-form" onSubmit={this.handleSubmit}>
          <input
            className="new-todo"
            placeholder="Task"
            value={description}
            onChange={this.handleChange}
            name="description"
            id="new-task-input"
            autoComplete="off"
          />
          <input
            className="new-todo-form__timer"
            placeholder="Min"
            value={minutes}
            onChange={this.handleChange}
            name="minutes"
            type="number"
          />
          <input
            className="new-todo-form__timer"
            placeholder="Sec"
            value={seconds}
            onChange={this.handleChange}
            name="seconds"
            type="number"
          />
          <button type="submit" className="submit">
            Submit
          </button>
        </form>
      </header>
    );
  }
}

NewTaskForm.propTypes = {
  addTask: PropTypes.func.isRequired,
};

export default NewTaskForm;
