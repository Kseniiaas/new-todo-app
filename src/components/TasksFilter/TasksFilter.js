import React from 'react';
import PropTypes from 'prop-types';
import './TasksFilter.css';

function TasksFilter({ changeFilter, activeFilter }) {
  return (
    <ul className="filters">
      <li>
        <button
          type="button"
          className={activeFilter === 'all' ? 'selected' : ''}
          onClick={() => changeFilter('all')}
        >
          All
        </button>
      </li>
      <li>
        <button
          type="button"
          className={activeFilter === 'active' ? 'selected' : ''}
          onClick={() => changeFilter('active')}
        >
          Active
        </button>
      </li>
      <li>
        <button
          type="button"
          className={activeFilter === 'completed' ? 'selected' : ''}
          onClick={() => changeFilter('completed')}
        >
          Completed
        </button>
      </li>
    </ul>
  );
}

TasksFilter.propTypes = {
  changeFilter: PropTypes.func.isRequired,
  activeFilter: PropTypes.string.isRequired,
};

export default TasksFilter;
