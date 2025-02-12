import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';
import './Task.css';

class Task extends Component {
  constructor(props) {
    super(props);
    const { task } = props;
    this.state = {
      isEditing: false,
      newDescription: task.description,
    };
  }

  startEditing = () => {
    this.setState({ isEditing: true });
  };

  handleChange = (event) => {
    this.setState({ newDescription: event.target.value });
  };

  handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      this.saveTask();
    }
  };

  handleBlur = () => {
    this.saveTask();
  };

  saveTask = () => {
    const { newDescription } = this.state;
    const { task, editTask } = this.props;

    if (newDescription.trim() !== '') {
      editTask(task.id, newDescription);
    }
    this.setState({ isEditing: false });
  };

  render() {
    const { task, toggleComplete, deleteTask } = this.props;
    const { isEditing, newDescription } = this.state;

    return (
      <li className={task.completed ? 'completed' : ''}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            id={`toggle-task-${task.id}`}
            name={`toggle-task-${task.id}`}
            checked={task.completed}
            onChange={() => toggleComplete(task.id)}
            aria-label="Toggle task completion"
          />

          {isEditing ? (
            <input
              type="text"
              name="taskDescription"
              className="edit-input"
              value={newDescription}
              onChange={this.handleChange}
              onKeyDown={this.handleKeyDown}
              onBlur={this.handleBlur}
            />
          ) : (
            <label
              htmlFor={`toggle-task-${task.id}`}
              onDoubleClick={this.startEditing}
            >
              <span className="description">{task.description}</span>
              <span className="created">
                {`created ${formatDistanceToNow(new Date(task.createdAt), { addSuffix: true, includeSeconds: true })}`}
              </span>
            </label>
          )}

          <button
            type="button"
            className="icon icon-edit"
            onClick={this.startEditing}
            aria-label="Edit task"
          />
          <button
            type="button"
            className="icon icon-destroy"
            onClick={() => deleteTask(task.id)}
            aria-label="Delete task"
          />
        </div>
      </li>
    );
  }
}

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    createdAt: PropTypes.oneOfType([
      PropTypes.instanceOf(Date),
      PropTypes.string,
    ]).isRequired,
  }).isRequired,
  toggleComplete: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  editTask: PropTypes.func.isRequired,
};

export default Task;
