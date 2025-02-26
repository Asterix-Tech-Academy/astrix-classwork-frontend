import React, { useState } from 'react';
import UserManagement from './UserManagement';
import ClassManagement from './ClassManagement';
import PendingUsers from './PendingUsers';
import LogManager from './LogManager';
import './AdminDashboard.css';

function AdminDashboard() {
  const [activeSection, setActiveSection] = useState('users');

  const sections = {
    users: <UserManagement />,
    classes: <ClassManagement />,
    pending: <PendingUsers />,
    logs: <LogManager />,
  };

  return (
    <div className="admin-dashboard">
      <nav className="admin-nav panel">
        <h1>Административен Панел</h1>
        <div className="admin-nav-buttons">
          <button 
            className={activeSection === 'users' ? 'active' : ''} 
            onClick={() => setActiveSection('users')}
          >
            Управление на Потребители
          </button>
          <button 
            className={activeSection === 'classes' ? 'active' : ''} 
            onClick={() => setActiveSection('classes')}
          >
            Управление на Класове
          </button>
          <button 
            className={activeSection === 'pending' ? 'active' : ''} 
            onClick={() => setActiveSection('pending')}
          >
            Чакащи Регистрации
          </button>
          <button 
            className={activeSection === 'logs' ? 'active' : ''} 
            onClick={() => setActiveSection('logs')}
          >
            Системен Журнал
          </button>
        </div>
      </nav>
      <main className="admin-content panel">
        {sections[activeSection]}
      </main>
    </div>
  );
}

export default AdminDashboard;