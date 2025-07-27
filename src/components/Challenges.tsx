import React from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { formatDate, calculateProgress } from '../../utils/helpers';

const Challenges: React.FC = () => {
  const { challenges, joinChallenge } = useAppContext();

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
        <h2 style={{ margin: 0, color: '#333' }}>Challenges</h2>
      </div>

      {challenges.length === 0 ? (
        <div
          style={{
            backgroundColor: '#f5f5f5',
            borderRadius: '8px',
            padding: '32px',
            textAlign: 'center',
          }}
        >
          <p style={{ margin: 0, color: '#666' }}>
            No challenges available. Check back later!
          </p>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '20px',
          }}
        >
          {challenges.map((challenge) => {
            const progress = calculateProgress(
              challenge.currentCount,
              challenge.targetCount
            );
            
            return (
              <div
                key={challenge.id}
                style={{
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div
                  style={{
                    backgroundColor: '#6200ea',
                    padding: '16px',
                    color: 'white',
                  }}
                >
                  <h3 style={{ margin: '0 0 8px 0' }}>{challenge.title}</h3>
                  <p style={{ margin: '0', fontSize: '14px', opacity: 0.8 }}>
                    {challenge.description}
                  </p>
                </div>
                
                <div style={{ padding: '16px', flex: 1 }}>
                  <div style={{ marginBottom: '12px' }}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '8px',
                        fontSize: '14px',
                        color: '#555',
                      }}
                    >
                      <span>Progress</span>
                      <span>
                        {challenge.currentCount}/{challenge.targetCount}
                      </span>
                    </div>
                    
                    <div
                      style={{
                        height: '8px',
                        backgroundColor: '#eee',
                        borderRadius: '4px',
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          height: '100%',
                          width: `${progress}%`,
                          backgroundColor: challenge.completed ? '#4caf50' : '#6200ea',
                        }}
                      />
                    </div>
                  </div>
                  
                  <div
                    style={{
                      marginBottom: '16px',
                      fontSize: '14px',
                      color: '#555',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '4px',
                      }}
                    >
                      <span>Deadline</span>
                      <span>{formatDate(challenge.deadline)}</span>
                    </div>
                    
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <span>Reward</span>
                      <span>
                        <span style={{ color: '#f9a825' }}>
                          {challenge.reward.coinValue} coins
                        </span>{' '}
                        &{' '}
                        <span style={{ color: '#6200ea' }}>
                          {challenge.reward.xpValue} XP
                        </span>
                      </span>
                    </div>
                  </div>
                  
                  {challenge.completed ? (
                    <div
                      style={{
                        backgroundColor: '#4caf50',
                        color: 'white',
                        padding: '12px',
                        borderRadius: '4px',
                        textAlign: 'center',
                        fontWeight: 'bold',
                      }}
                    >
                      Completed! 🎉
                    </div>
                  ) : (
                    <button
                      onClick={() => joinChallenge(challenge.id)}
                      style={{
                        width: '100%',
                        padding: '12px',
                        backgroundColor: '#6200ea',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: 'bold',
                      }}
                    >
                      Join Challenge
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Challenges; 