import React from 'react';

/**
 * TaskItem component representing an individual to-do item.
 * Demonstrates props-based communication to notify parent of toggle and delete actions.
 *
 * @param {Object} props
 * @param {Object} props.task - The task object { id, text, completed }
 * @param {Function} props.onToggleTask - Callback when task checkbox is toggled
 * @param {Function} props.onDeleteTask - Callback when delete button is clicked
 */
function TaskItem({ task, onToggleTask, onDeleteTask }) {
  return (
    <li className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div 
        className="task-content" 
        onClick={() => onToggleTask(task.id)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            onToggleTask(task.id);
          }
        }}
      >
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleTask(task.id)}
          className="task-checkbox"
          aria-label={`Mark "${task.text}" as ${task.completed ? 'incomplete' : 'complete'}`}
        />
        <span className="task-text">{task.text}</span>
      </div>

      <button
        onClick={() => onDeleteTask(task.id)}
        className="btn-delete"
        title="Delete task"
        aria-label={`Delete "${task.text}"`}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="18" 
          height="18" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <polyline points="3 6 5 6 21 6" />
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          <line x1="10" y1="11" x2="10" y2="17" />
          <line x1="14" y1="11" x2="14" y2="17" />
        </svg>
      </button>
    </li>
  );
}

export default TaskItem;
