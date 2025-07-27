import React, { useState } from 'react';
import { AppProvider } from './contexts/AppContext';
import './App.css';

// Import components
import Dashboard from './components/dashboard/Dashboard';
import TaskList from './components/tasks/TaskList';
import TaskForm from './components/tasks/TaskForm';
import AvatarCustomizer from './components/avatar/AvatarCustomizer';
import Challenges from './components/challenges/Challenges';
import TaskSuggestions from './components/suggestions/TaskSuggestions';
import Navigation from './components/navigation/Navigation';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'tasks':
        return (
          <div className="app-container">
            <TaskForm />
            <TaskList />
          </div>
        );
      case 'avatar':
        return <AvatarCustomizer />;
      case 'challenges':
        return <Challenges />;
      case 'suggestions':
        return <TaskSuggestions />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <AppProvider>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <header 
          style={{ 
            backgroundColor: 'var(--primary-color)', 
            color: 'white', 
            padding: 'var(--spacing-md)', 
            textAlign: 'center',
            boxShadow: 'var(--shadow-md)',
            position: 'relative'
          }}
        >
          <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '600' }}>
            ✨ Gamified Task Manager ✨
          </h1>
        </header>

        <main style={{ flex: 1 }}>{renderContent()}</main>

        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </AppProvider>
  );
}

export default App; 