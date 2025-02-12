import React from 'react';
import PropTypes from 'prop-types';
import './Footer.css';

function Footer({ tasksLeft, changeFilter, activeFilter, clearCompleted }) {
  return (
    <footer className="footer">
      <span className="todo-count">{tasksLeft} items left</span>
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
      <button
        type="button"
        className="clear-completed"
        onClick={clearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
}

Footer.defaultProps = {
  tasksLeft: 0,
  changeFilter: () => {},
  activeFilter: 'all',
  clearCompleted: () => {},
};

Footer.propTypes = {
  tasksLeft: PropTypes.number,
  changeFilter: PropTypes.func,
  activeFilter: PropTypes.string,
  clearCompleted: PropTypes.func,
};

export default Footer;
