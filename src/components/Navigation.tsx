import React, { useState } from 'react';
import { useAppContext } from '../../contexts/AppContext';

interface TabProps {
  title: string;
  icon: string;
  active: boolean;
  onClick: () => void;
  badge?: number;
}

const Tab: React.FC<TabProps> = ({ title, icon, active, onClick, badge }) => {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '12px',
        backgroundColor: active ? 'var(--highlight-color, #ff8a65)' : 'transparent',
        color: active ? 'white' : '#5d4037',
        border: 'none',
        borderRadius: '12px',
        cursor: 'pointer',
        position: 'relative',
        transition: 'all 0.3s ease',
        flex: 1,
        transform: active ? 'translateY(-5px)' : 'none',
        boxShadow: active ? '0 4px 10px rgba(255, 138, 101, 0.3)' : 'none',
      }}
    >
      <div
        style={{
          fontSize: '28px',
          marginBottom: '6px',
          position: 'relative',
        }}
      >
        {icon}
        {badge !== undefined && badge > 0 && (
          <div
            style={{
              position: 'absolute',
              top: '-8px',
              right: '-12px',
              backgroundColor: '#ff5252',
              color: 'white',
              borderRadius: '50%',
              width: '22px',
              height: '22px',
              fontSize: '13px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
            }}
          >
            {badge}
          </div>
        )}
      </div>
      <div 
        style={{ 
          fontSize: '13px', 
          fontWeight: active ? 'bold' : 'normal',
          opacity: active ? 1 : 0.8
        }}
      >
        {title}
      </div>
    </button>
  );
};

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const { tasks, user } = useAppContext();
  
  // Calculate badges
  const pendingTasks = tasks.filter((task) => !task.completed).length;
  
  const tabs = [
    { id: 'dashboard', title: 'Dashboard', icon: '📊' },
    { id: 'tasks', title: 'Tasks', icon: '📋', badge: pendingTasks },
    { id: 'avatar', title: 'Avatar', icon: '🧸' },
    { id: 'challenges', title: 'Challenges', icon: '🏆' },
    { id: 'suggestions', title: 'AI Suggestions', icon: '💡' },
  ];

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff9f0',
        boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.07)',
        borderTop: '1px solid #f8e0d2',
        borderTopLeftRadius: '20px',
        borderTopRightRadius: '20px',
        padding: '10px 0',
        zIndex: 1000,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '8px 12px',
          maxWidth: '700px',
          margin: '0 auto',
        }}
      >
        {tabs.map((tab) => (
          <Tab
            key={tab.id}
            title={tab.title}
            icon={tab.icon}
            active={activeTab === tab.id}
            onClick={() => onTabChange(tab.id)}
            badge={tab.badge}
          />
        ))}
      </div>
    </div>
  );
};

export default Navigation; 