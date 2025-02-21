import React, { useState } from 'react';
import UserManagement from './UserManagement';
import ClassManagement from './ClassManagement';
import './AdminDashboard.css';

function AdminDashboard() {
  const [activeSection, setActiveSection] = useState('users');

  const sections = {
    users: <UserManagement />,
    classes: <ClassManagement />,
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
        </div>
      </nav>
      <main className="admin-content panel">
        {sections[activeSection]}
      </main>
    </div>
  );
}

export default AdminDashboard;