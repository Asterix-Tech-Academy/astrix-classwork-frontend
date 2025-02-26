import React, { useState, useEffect } from 'react';

const mockPendingUsers = [
  {
    id: 1,
    name: 'Иван Петров',
    email: 'ivan.petrov@example.com',
    registrationDate: '2025-02-20T10:30:00',
    role: 'student'
  },
  {
    id: 2,
    name: 'Мария Димитрова',
    email: 'maria.d@example.com',
    registrationDate: '2025-02-21T14:15:00',
    role: 'teacher'
  },
  {
    id: 3,
    name: 'Георги Иванов',
    email: 'g.ivanov@example.com',
    registrationDate: '2025-02-22T09:45:00',
    role: 'student'
  }
];

function PendingUsers() {
  const [pendingUsers, setPendingUsers] = useState([]);

  useEffect(() => {
    setPendingUsers(mockPendingUsers);
  }, []);

  const handleAcceptUser = async (userId) => {
    try {
      setPendingUsers(pendingUsers.filter(user => user.id !== userId));
      console.log(`User ${userId} accepted`);
    } catch (error) {
      console.error('Error accepting user:', error);
    }
  };

  const handleRejectUser = async (userId) => {
    try {
      setPendingUsers(pendingUsers.filter(user => user.id !== userId));
      console.log(`User ${userId} rejected`);
    } catch (error) {
      console.error('Error rejecting user:', error);
    }
  };

  return (
    <div className="pending-users">
      <h2>Чакащи Регистрации</h2>
      {pendingUsers.length === 0 ? (
        <p>Няма чакащи регистрации</p>
      ) : (
        <table className="users-table">
          <thead>
            <tr>
              <th>Име</th>
              <th>Имейл</th>
              <th>Роля</th>
              <th>Дата на регистрация</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {pendingUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role === 'student' ? 'Ученик' : 'Учител'}</td>
                <td>{new Date(user.registrationDate).toLocaleDateString('bg-BG')}</td>
                <td>
                  <button
                    className="accept-button"
                    onClick={() => handleAcceptUser(user.id)}
                  >
                    Приеми
                  </button>
                  <button
                    className="reject-button"
                    onClick={() => handleRejectUser(user.id)}
                  >
                    Отхвърли
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default PendingUsers;