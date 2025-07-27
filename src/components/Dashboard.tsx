import React from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { calculateProgress, calculateXpForNextLevel } from '../../utils/helpers';

const Dashboard: React.FC = () => {
  const { user, tasks } = useAppContext();
  
  // Calculate statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  
  // Calculate XP progress
  const nextLevelXp = calculateXpForNextLevel(user.level);
  const xpProgress = calculateProgress(user.xp, nextLevelXp);
  
  // Basic stats cards
  const statCards = [
    {
      title: 'Tasks Completed',
      value: completedTasks,
      color: '#4caf50',
      icon: '✓',
    },
    {
      title: 'Pending Tasks',
      value: pendingTasks,
      color: '#ff9800',
      icon: '⏳',
    },
    {
      title: 'Completion Rate',
      value: `${completionRate}%`,
      color: '#2196f3',
      icon: '📊',
    },
    {
      title: 'Streak Days',
      value: user.streakDays,
      color: '#f44336',
      icon: '🔥',
    },
  ];

  return (
    <div style={{ padding: '16px', maxWidth: '1000px', margin: '0 auto' }}>
      <h2 style={{ margin: '0 0 24px 0', color: '#333' }}>Dashboard</h2>
      
      {/* User stats */}
      <div
        style={{
          backgroundColor: '#6200ea',
          borderRadius: '8px',
          padding: '24px',
          marginBottom: '24px',
          color: 'white',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '24px',
        }}
      >
        <div style={{ flex: '1 1 300px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '16px',
            }}
          >
            <div
              style={{
                width: '64px',
                height: '64px',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '32px',
                marginRight: '16px',
              }}
            >
              👤
            </div>
            <div>
              <h3 style={{ margin: '0', fontSize: '20px' }}>{user.username}</h3>
              <div style={{ display: 'flex', alignItems: 'center', marginTop: '4px' }}>
                <span
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '4px',
                    padding: '2px 8px',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    marginRight: '8px',
                  }}
                >
                  Level {user.level}
                </span>
                <span style={{ fontSize: '14px', opacity: 0.8 }}>
                  {user.xp}/{nextLevelXp} XP
                </span>
              </div>
            </div>
          </div>
          
          <div style={{ marginBottom: '16px' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '8px',
                fontSize: '14px',
              }}
            >
              <span>Level Progress</span>
              <span>{xpProgress}%</span>
            </div>
            <div
              style={{
                height: '8px',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '4px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: `${xpProgress}%`,
                  backgroundColor: 'white',
                }}
              />
            </div>
          </div>
        </div>
        
        <div
          style={{
            flex: '0 1 auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px 24px',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '8px',
          }}
        >
          <div
            style={{
              fontSize: '24px',
              fontWeight: 'bold',
              marginBottom: '8px',
            }}
          >
            💰 {user.coins}
          </div>
          <div style={{ fontSize: '14px', opacity: 0.8 }}>Coins</div>
        </div>
        
        <div
          style={{
            flex: '0 1 auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px 24px',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '8px',
          }}
        >
          <div
            style={{
              fontSize: '24px',
              fontWeight: 'bold',
              marginBottom: '8px',
            }}
          >
            🏆 {user.rewards.length}
          </div>
          <div style={{ fontSize: '14px', opacity: 0.8 }}>Rewards</div>
        </div>
      </div>
      
      {/* Stats cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '16px',
          marginBottom: '32px',
        }}
      >
        {statCards.map((stat) => (
          <div
            key={stat.title}
            style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              padding: '16px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              borderLeft: `4px solid ${stat.color}`,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                width: '40px',
                height: '40px',
                backgroundColor: `${stat.color}20`,
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                marginRight: '16px',
                color: stat.color,
              }}
            >
              {stat.icon}
            </div>
            <div>
              <h4 style={{ margin: '0 0 4px 0', color: '#555', fontSize: '14px' }}>
                {stat.title}
              </h4>
              <div
                style={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: '#333',
                }}
              >
                {stat.value}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Rewards section */}
      <div style={{ marginBottom: '32px' }}>
        <h3 style={{ margin: '0 0 16px 0', color: '#333' }}>Recent Rewards</h3>
        
        {user.rewards.length === 0 ? (
          <div
            style={{
              backgroundColor: '#f5f5f5',
              borderRadius: '8px',
              padding: '24px',
              textAlign: 'center',
            }}
          >
            <p style={{ margin: 0, color: '#666' }}>
              Complete tasks and challenges to earn rewards!
            </p>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '16px',
            }}
          >
            {user.rewards.slice(0, 4).map((reward) => (
              <div
                key={reward.id}
                style={{
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  padding: '16px',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    backgroundColor: '#f9a825',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                    marginBottom: '12px',
                    color: 'white',
                  }}
                >
                  🏆
                </div>
                <h4 style={{ margin: '0 0 8px 0', color: '#333' }}>{reward.name}</h4>
                <p
                  style={{
                    margin: '0',
                    fontSize: '12px',
                    color: '#666',
                  }}
                >
                  {reward.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard; 