import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';
import './Task.css';

function Task({ task, toggleComplete, deleteTask, editTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newDescription, setNewDescription] = useState(task.description);
  const [remainingTime, setRemainingTime] = useState(
    task.minutes * 60 + task.seconds,
  );
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning && remainingTime > 0) {
      timer = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (remainingTime === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(timer);
  }, [isRunning, remainingTime]);

  const formatTime = () => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <li className={task.completed ? 'completed' : ''}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleComplete(task.id)}
          aria-label="Toggle task completion"
        />

        {isEditing ? (
          <input
            type="text"
            id="taskName"
            className="edit-input"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                editTask(task.id, newDescription);
                setIsEditing(false);
              }
            }}
            onBlur={() => setIsEditing(false)}
          />
        ) : (
          <label htmlFor="taskName" onDoubleClick={() => setIsEditing(true)}>
            <span className="title">{task.description}</span>
            <span className="description">
              <button
                type="button"
                className="icon icon-play"
                onClick={() => setIsRunning(true)}
                disabled={isRunning}
              />
              <button
                type="button"
                className="icon icon-pause"
                onClick={() => setIsRunning(false)}
                disabled={!isRunning}
              />
              {formatTime()}
            </span>
            <span className="created">
              created{' '}
              {formatDistanceToNow(new Date(task.createdAt), {
                addSuffix: true,
                includeSeconds: true,
              })}
            </span>
          </label>
        )}

        <button
          type="button"
          className="icon icon-edit"
          onClick={() => setIsEditing(true)}
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

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    createdAt: PropTypes.instanceOf(Date),
    minutes: PropTypes.number,
    seconds: PropTypes.number,
  }).isRequired,
  toggleComplete: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  editTask: PropTypes.func.isRequired,
};

export default Task;
