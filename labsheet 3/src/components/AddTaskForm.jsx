import React, { useState } from 'react';

/**
 * AddTaskForm component for entering and submitting new tasks.
 * Uses local state (useState) for the controlled input and passes
 * data back to parent via the onAddTask prop.
 *
 * @param {Object} props
 * @param {Function} props.onAddTask - Callback to send newly created task to parent
 */
function AddTaskForm({ onAddTask }) {
  const [taskText, setTaskText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = taskText.trim();
    if (!trimmed) return;

    onAddTask(trimmed);
    setTaskText('');
  };

  return (
    <form className="add-task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="task-input"
        placeholder="What needs to be done?"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        autoFocus
      />
      <button type="submit" className="btn-add">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="18" 
          height="18" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        <span>Add</span>
      </button>
    </form>
  );
}

export default AddTaskForm;
