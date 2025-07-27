import React from 'react';
import { Task } from '../../types';
import { formatDate, isTaskOverdue, calculateTaskReward } from '../../utils/helpers';
import { useAppContext } from '../../contexts/AppContext';

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const { completeTask, deleteTask } = useAppContext();
  const isOverdue = isTaskOverdue(task.deadline);
  const reward = calculateTaskReward(task.difficulty);

  // Define difficulty colors with warmer tones
  const difficultyColors = {
    easy: 'var(--success-color)',
    medium: 'var(--highlight-color)',
    hard: '#ff9800',
    expert: 'var(--error-color)',
  };

  return (
    <div 
      className="task-item"
      style={{
        borderLeft: `4px solid ${difficultyColors[task.difficulty]}`,
        opacity: task.completed ? 0.8 : 1,
      }}
    >
      <div 
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          width: '100%',
        }}
      >
        <div style={{ flex: 1 }}>
          <h3 
            style={{ 
              margin: '0 0 8px 0',
              textDecoration: task.completed ? 'line-through' : 'none',
              color: task.completed ? '#888' : 'var(--text-color)',
              fontSize: '1.1rem',
            }}
          >
            {task.title}
          </h3>
          
          {task.description && (
            <p 
              style={{ 
                margin: '0 0 12px 0',
                color: 'var(--text-color)',
                opacity: 0.8,
                fontSize: '0.9rem',
              }}
            >
              {task.description}
            </p>
          )}
          
          <div 
            style={{ 
              display: 'flex',
              alignItems: 'center',
              fontSize: '0.85rem',
              color: 'var(--text-color)',
              opacity: 0.7,
            }}
          >
            <span 
              style={{ 
                marginRight: '16px',
                color: isOverdue && !task.completed ? 'var(--error-color)' : 'inherit',
                fontWeight: isOverdue && !task.completed ? 'bold' : 'normal',
              }}
            >
              📅 {formatDate(task.deadline)}
            </span>
            
            <span 
              style={{ 
                backgroundColor: difficultyColors[task.difficulty],
                color: 'white',
                padding: '2px 8px',
                borderRadius: 'var(--border-radius-sm)',
                fontSize: '0.8rem',
                textTransform: 'capitalize',
              }}
            >
              {task.difficulty}
            </span>
          </div>
        </div>
        
        <div 
          style={{ 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
          }}
        >
          <div 
            style={{ 
              backgroundColor: 'var(--background-color)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--border-radius-sm)',
              padding: '6px 10px',
              fontSize: '0.85rem',
              marginBottom: '10px',
            }}
          >
            <div>💰 {reward.coins} coins</div>
            <div>✨ {reward.xp} XP</div>
          </div>
          
          <div style={{ display: 'flex' }}>
            {!task.completed && (
              <button
                onClick={() => completeTask(task.id)}
                className="button"
                style={{
                  padding: '6px 10px',
                  marginRight: '8px',
                  fontSize: '0.9rem',
                }}
                aria-label="Complete task"
              >
                ✓
              </button>
            )}
            
            <button
              onClick={() => deleteTask(task.id)}
              className="button"
              style={{
                padding: '6px 10px',
                fontSize: '0.9rem',
                backgroundColor: 'var(--error-color)',
              }}
              aria-label="Delete task"
            >
              ✕
            </button>
          </div>
        </div>
      </div>
      
      {task.completed && task.completedAt && (
        <div 
          style={{ 
            position: 'absolute',
            top: '16px',
            right: '16px',
            backgroundColor: 'var(--success-color)',
            color: 'white',
            padding: '4px 8px',
            borderRadius: 'var(--border-radius-sm)',
            fontSize: '0.8rem',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          ✓ Completed on {formatDate(task.completedAt)}
        </div>
      )}
    </div>
  );
};

export default TaskItem; 