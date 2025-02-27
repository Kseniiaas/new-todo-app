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
      remainingTime: task.minutes * 60 + task.seconds,
      isRunning: false,
    };
    this.timer = null;
  }

  startTimer = () => {
    const { isRunning } = this.state;
    if (!isRunning) {
      this.timer = setInterval(() => {
        this.setState((prevState) => {
          const { remainingTime } = prevState;
          if (remainingTime > 0) {
            return { remainingTime: remainingTime - 1 };
          }
          clearInterval(this.timer);
          return { isRunning: false };
        });
      }, 1000);
      this.setState({ isRunning: true });
    }
  };

  pauseTimer = () => {
    clearInterval(this.timer);
    this.setState({ isRunning: false });
  };

  formatTime = () => {
    const { remainingTime } = this.state;
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  render() {
    const { task, toggleComplete, deleteTask, editTask } = this.props;
    const { isEditing, newDescription, isRunning } = this.state;

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
              onChange={(e) =>
                this.setState({ newDescription: e.target.value })
              }
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  editTask(task.id, newDescription);
                  this.setState({ isEditing: false });
                }
              }}
              onBlur={() => this.setState({ isEditing: false })}
            />
          ) : (
            <label
              htmlFor={`task-${task.id}`}
              onDoubleClick={() => this.setState({ isEditing: true })}
            >
              <span className="title">{task.description}</span>
              <span className="description">
                <button
                  type="button"
                  className="icon icon-play"
                  onClick={this.startTimer}
                  disabled={isRunning}
                />
                <button
                  type="button"
                  className="icon icon-pause"
                  onClick={this.pauseTimer}
                  disabled={!isRunning}
                />
                {this.formatTime()}
              </span>
              <span className="created">
                {`created ${formatDistanceToNow(new Date(task.createdAt), { addSuffix: true, includeSeconds: true })}`}
              </span>
            </label>
          )}

          <button
            type="button"
            className="icon icon-edit"
            onClick={() => this.setState({ isEditing: true })}
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
    minutes: PropTypes.number.isRequired,
    seconds: PropTypes.number.isRequired,
  }).isRequired,
  toggleComplete: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  editTask: PropTypes.func.isRequired,
};

export default Task;
