import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './NewTaskForm.css';

class NewTaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = { description: '' };
  }

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ description: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { description } = this.state;
    const { addTask } = this.props;
    if (description.trim()) {
      addTask(description);
      this.setState({ description: '' });
    }
  };

  render() {
    const { description } = this.state;
    return (
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            value={description}
            onChange={this.handleChange}
            name="taskDescription"
            id="new-task-input"
            autoComplete="off"
          />
        </form>
      </header>
    );
  }
}

NewTaskForm.propTypes = {
  addTask: PropTypes.func.isRequired,
};

export default NewTaskForm;
