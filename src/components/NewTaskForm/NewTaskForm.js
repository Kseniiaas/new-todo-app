import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './NewTaskForm.css';

function NewTaskForm({ addTask }) {
  const [description, setDescription] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (description.trim()) {
      addTask(
        description,
        parseInt(minutes, 10) || 0,
        parseInt(seconds, 10) || 0,
      );
      setDescription('');
      setMinutes('');
      setSeconds('');
    }
  };

  return (
    <header className="header">
      <h1>todos</h1>
      <form className="new-todo-form" onSubmit={handleSubmit}>
        <input
          className="new-todo"
          placeholder="Task"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          name="description"
          autoComplete="off"
        />
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          value={minutes}
          onChange={(e) => setMinutes(e.target.value)}
          name="minutes"
          type="number"
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          value={seconds}
          onChange={(e) => setSeconds(e.target.value)}
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

NewTaskForm.propTypes = {
  addTask: PropTypes.func.isRequired,
};

export default NewTaskForm;
