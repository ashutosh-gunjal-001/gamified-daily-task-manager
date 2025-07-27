import React, { useState } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { Difficulty } from '../../types';

const TaskForm: React.FC = () => {
  const { addTask } = useAppContext();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [deadline, setDeadline] = useState<string>(
    new Date().toISOString().split('T')[0]
  );

  const difficultyOptions: Difficulty[] = ['easy', 'medium', 'hard', 'expert'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addTask({
      title,
      description,
      difficulty,
      deadline: new Date(deadline),
    });

    // Reset form
    setTitle('');
    setDescription('');
    setDifficulty('medium');
    setDeadline(new Date().toISOString().split('T')[0]);
    setIsFormOpen(false);
  };

  // Define difficulty colors with warmer tones
  const difficultyColors = {
    easy: 'var(--success-color)',
    medium: 'var(--highlight-color)',
    hard: '#ff9800',
    expert: 'var(--error-color)',
  };

  return (
    <div className="card">
      {!isFormOpen ? (
        <button
          onClick={() => setIsFormOpen(true)}
          style={{
            width: '100%',
            padding: '16px',
            backgroundColor: 'transparent',
            border: '2px dashed var(--border-color)',
            borderRadius: 'var(--border-radius-md)',
            textAlign: 'left',
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            fontSize: '1rem',
            color: 'var(--text-color)',
            transition: 'all 0.2s ease',
          }}
        >
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '32px',
              height: '32px',
              backgroundColor: 'var(--highlight-color)',
              borderRadius: '50%',
              color: 'white',
              marginRight: '12px',
              fontSize: '20px',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            +
          </span>
          Add a new task
        </button>
      ) : (
        <form onSubmit={handleSubmit}>
          <h3 className="card-title">Add New Task</h3>
          
          <div className="form-group">
            <label
              htmlFor="title"
              className="form-label"
            >
              Title*
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What do you need to do?"
              className="input"
              required
            />
          </div>
          
          <div className="form-group">
            <label
              htmlFor="description"
              className="form-label"
            >
              Description (optional)
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add details about your task"
              rows={3}
              className="input"
              style={{ resize: 'vertical' }}
            />
          </div>
          
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '16px',
              marginBottom: 'var(--spacing-md)',
            }}
          >
            <div style={{ flex: '1 1 160px' }}>
              <label
                htmlFor="difficulty"
                className="form-label"
              >
                Difficulty
              </label>
              <div
                style={{
                  display: 'flex',
                  width: '100%',
                  borderRadius: 'var(--border-radius-sm)',
                  overflow: 'hidden',
                  border: '1px solid var(--border-color)',
                }}
              >
                {difficultyOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setDifficulty(option)}
                    style={{
                      flex: 1,
                      padding: '10px 0',
                      border: 'none',
                      borderBottom: `3px solid ${
                        difficulty === option
                          ? difficultyColors[option]
                          : 'transparent'
                      }`,
                      backgroundColor:
                        difficulty === option
                          ? `${difficultyColors[option]}20`
                          : 'var(--background-color)',
                      color: difficulty === option ? difficultyColors[option] : 'var(--text-color)',
                      cursor: 'pointer',
                      textTransform: 'capitalize',
                      fontWeight: difficulty === option ? 'bold' : 'normal',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
            
            <div style={{ flex: '1 1 160px' }}>
              <label
                htmlFor="deadline"
                className="form-label"
              >
                Deadline
              </label>
              <input
                id="deadline"
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="input"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>
          
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '12px',
              marginTop: '24px',
            }}
          >
            <button
              type="button"
              onClick={() => setIsFormOpen(false)}
              className="button button-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="button"
            >
              Add Task
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default TaskForm; 