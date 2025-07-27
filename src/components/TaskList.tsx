import React, { useState } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import TaskItem from './TaskItem';
import { sortTasksByDeadline } from '../../utils/helpers';

const TaskList: React.FC = () => {
  const { tasks } = useAppContext();
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Filter tasks based on selected filter
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') return true;
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  // Sort tasks by deadline
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    const compareResult = sortTasksByDeadline(a, b);
    return sortOrder === 'asc' ? compareResult : -compareResult;
  });

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px',
        }}
      >
        <h2 style={{ margin: 0 }}>Your Tasks</h2>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              marginRight: '16px',
              display: 'flex',
              borderRadius: '8px',
              overflow: 'hidden',
              border: '1px solid #ddd',
            }}
          >
            <button
              onClick={() => setFilter('all')}
              style={{
                padding: '8px 16px',
                border: 'none',
                backgroundColor: filter === 'all' ? '#2196f3' : '#f5f5f5',
                color: filter === 'all' ? 'white' : '#333',
                cursor: 'pointer',
                borderRight: '1px solid #ddd',
              }}
            >
              All
            </button>
            <button
              onClick={() => setFilter('active')}
              style={{
                padding: '8px 16px',
                border: 'none',
                backgroundColor: filter === 'active' ? '#2196f3' : '#f5f5f5',
                color: filter === 'active' ? 'white' : '#333',
                cursor: 'pointer',
                borderRight: '1px solid #ddd',
              }}
            >
              Active
            </button>
            <button
              onClick={() => setFilter('completed')}
              style={{
                padding: '8px 16px',
                border: 'none',
                backgroundColor: filter === 'completed' ? '#2196f3' : '#f5f5f5',
                color: filter === 'completed' ? 'white' : '#333',
                cursor: 'pointer',
              }}
            >
              Completed
            </button>
          </div>

          <button
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '8px 12px',
              backgroundColor: '#f5f5f5',
              border: '1px solid #ddd',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            {sortOrder === 'asc' ? '⬆️ Earliest First' : '⬇️ Latest First'}
          </button>
        </div>
      </div>

      {sortedTasks.length === 0 ? (
        <div
          style={{
            backgroundColor: '#f5f5f5',
            borderRadius: '8px',
            padding: '32px',
            textAlign: 'center',
          }}
        >
          <p style={{ margin: 0, color: '#666' }}>
            {filter === 'all'
              ? 'No tasks yet. Add your first task to get started!'
              : filter === 'active'
              ? 'No active tasks. Great job!'
              : 'No completed tasks yet. Start by completing a task!'}
          </p>
        </div>
      ) : (
        <div>
          {sortedTasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList; 