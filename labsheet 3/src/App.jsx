import React, { useState, useEffect } from 'react';
import AddTaskForm from './components/AddTaskForm';
import TaskList from './components/TaskList';

const STORAGE_KEY = 'lab3_react_todos';

const INITIAL_TASKS = [
  { id: 1, text: 'Review React component lifecycle & hooks', completed: true },
  { id: 2, text: 'Complete Lab 3 To-Do App with state & props', completed: false },
  { id: 3, text: 'Build Lab 4 multi-page SPA with react-router-dom', completed: false },
];

function App() {
  // useState hook initialized from localStorage with fallback to default tasks
  const [tasks, setTasks] = useState(() => {
    try {
      const savedTasks = localStorage.getItem(STORAGE_KEY);
      if (savedTasks) {
        return JSON.parse(savedTasks);
      }
    } catch (error) {
      console.error('Error reading tasks from localStorage:', error);
    }
    return INITIAL_TASKS;
  });

  const [filter, setFilter] = useState('all');

  // useEffect hook to persist tasks whenever the tasks state changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error('Error writing tasks to localStorage:', error);
    }
  }, [tasks]);

  // Handler passed down to AddTaskForm via props
  const handleAddTask = (text) => {
    const newTask = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTasks((prevTasks) => [newTask, ...prevTasks]);
  };

  // Handler passed down to TaskList -> TaskItem via props
  const handleToggleTask = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Handler passed down to TaskList -> TaskItem via props
  const handleDeleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const handleClearCompleted = () => {
    setTasks((prevTasks) => prevTasks.filter((task) => !task.completed));
  };

  // Computed values
  const totalCount = tasks.length;
  const completedCount = tasks.filter((t) => t.completed).length;
  const pendingCount = totalCount - completedCount;

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  return (
    <div className="app-container">
      <header className="header">
        <h1>
          <span>📝</span> TaskMaster
        </h1>
        <p>Lab 3 — React Component & State Management</p>
      </header>

      {/* Stats summary */}
      <div className="stats-card">
        <div className="stat-item">
          <div className="stat-num">{totalCount}</div>
          <div className="stat-label">Total</div>
        </div>
        <div className="stat-item">
          <div className="stat-num">{pendingCount}</div>
          <div className="stat-label">Pending</div>
        </div>
        <div className="stat-item">
          <div className="stat-num">{completedCount}</div>
          <div className="stat-label">Done</div>
        </div>
      </div>

      {/* Form component: props-based communication (onAddTask) */}
      <AddTaskForm onAddTask={handleAddTask} />

      {/* Filter tabs */}
      <div className="filter-tabs">
        <button
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All ({totalCount})
        </button>
        <button
          className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
          onClick={() => setFilter('active')}
        >
          Active ({pendingCount})
        </button>
        <button
          className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
          onClick={() => setFilter('completed')}
        >
          Completed ({completedCount})
        </button>
      </div>

      {/* List component: props-based communication */}
      <TaskList
        tasks={filteredTasks}
        onToggleTask={handleToggleTask}
        onDeleteTask={handleDeleteTask}
      />

      {completedCount > 0 && (
        <div className="clear-completed-wrapper">
          <button className="btn-clear" onClick={handleClearCompleted}>
            Clear Completed ({completedCount})
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
