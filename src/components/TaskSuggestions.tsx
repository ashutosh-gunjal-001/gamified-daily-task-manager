import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { Task } from '../../types';
import { formatDate } from '../../utils/helpers';

const TaskSuggestions: React.FC = () => {
  const { getTaskSuggestions, addTask } = useAppContext();
  const [suggestions, setSuggestions] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate AI processing time
    setIsLoading(true);
    const timer = setTimeout(() => {
      setSuggestions(getTaskSuggestions());
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [getTaskSuggestions]);

  const handleAddTask = (task: Task) => {
    addTask({
      title: task.title,
      description: task.description,
      difficulty: task.difficulty,
      deadline: new Date(task.deadline),
    });

    // Remove the suggestion after adding
    setSuggestions(suggestions.filter((s) => s.id !== task.id));
  };

  return (
    <div style={{ padding: '16px', maxWidth: '800px', margin: '0 auto' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px',
        }}
      >
        <h2 style={{ margin: 0, color: '#333' }}>AI Task Suggestions</h2>
      </div>

      <div
        style={{
          backgroundColor: '#f5f5f5',
          borderRadius: '8px',
          padding: '16px',
          marginBottom: '24px',
        }}
      >
        <p style={{ margin: '0 0 10px 0', color: '#666' }}>
          These are personalized suggestions based on your task history and completion patterns.
        </p>
      </div>

      {isLoading ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '200px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                border: '3px solid rgba(98, 0, 234, 0.1)',
                borderTopColor: '#6200ea',
                animation: 'spin 1s linear infinite',
                marginBottom: '16px',
              }}
            />
            <style>
              {`
                @keyframes spin {
                  to { transform: rotate(360deg); }
                }
              `}
            </style>
            <p style={{ color: '#666' }}>Analyzing your task patterns...</p>
          </div>
        </div>
      ) : suggestions.length === 0 ? (
        <div
          style={{
            backgroundColor: '#fff',
            borderRadius: '8px',
            padding: '32px',
            textAlign: 'center',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          }}
        >
          <p style={{ margin: 0, color: '#666' }}>
            No suggestions available. Complete more tasks to receive personalized recommendations!
          </p>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '20px',
          }}
        >
          {suggestions.map((suggestion) => (
            <div
              key={suggestion.id}
              style={{
                backgroundColor: 'white',
                borderRadius: '8px',
                padding: '16px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
              }}
            >
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: '0 0 8px 0', color: '#333' }}>
                  {suggestion.title}
                </h3>
                
                {suggestion.description && (
                  <p
                    style={{
                      color: '#666',
                      margin: '0 0 16px 0',
                      fontSize: '14px',
                    }}
                  >
                    {suggestion.description}
                  </p>
                )}
                
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '8px',
                    fontSize: '13px',
                    color: '#777',
                  }}
                >
                  <span style={{ marginRight: '12px' }}>
                    📅 {formatDate(suggestion.deadline)}
                  </span>
                  
                  <span
                    style={{
                      backgroundColor:
                        suggestion.difficulty === 'easy'
                          ? '#4caf50'
                          : suggestion.difficulty === 'medium'
                          ? '#2196f3'
                          : suggestion.difficulty === 'hard'
                          ? '#ff9800'
                          : '#f44336',
                      color: 'white',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      textTransform: 'capitalize',
                    }}
                  >
                    {suggestion.difficulty}
                  </span>
                </div>
              </div>
              
              <button
                onClick={() => handleAddTask(suggestion)}
                style={{
                  backgroundColor: '#6200ea',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '12px',
                  marginTop: '16px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                }}
              >
                Add to Tasks
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskSuggestions; 