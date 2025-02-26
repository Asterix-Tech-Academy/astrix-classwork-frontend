import React, { useState } from 'react';

function UserManagement() {
  const [users] = useState([
    { id: 1, name: 'Преслав Колев', role: 'ученик', class: '11A' },
    { id: 2, name: 'Пенка Пенкова', role: 'учител', subjects: ['Английски'] },
  ]);

  const [newUser, setNewUser] = useState({
    name: '',
    role: 'ученик',
    class: '',
    password: '',
    confirmPassword: ''
  });

  const handleAddUser = (e) => {
    e.preventDefault();
    if (newUser.password !== newUser.confirmPassword) {
      alert('Паролите не съвпадат!');
      return;
    }
    console.log('Добавяне на потребител:', newUser);
  };

  return (
    <div className="user-management">
      <h2>Управление на Потребители</h2>
      
      <div className="user-list panel">
        <h3>Текущи Потребители</h3>
        <table>
          <thead>
            <tr>
              <th>Име</th>
              <th>Роля</th>
              <th>Клас/Предмети</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.role}</td>
                <td>{user.class || user.subjects?.join(', ')}</td>
                <td>
                  <button 
                    className="edit-button"
                    onClick={() => console.log('Редактиране:', user.id)}
                  >
                    Редактиране
                  </button>
                  <button 
                    className="delete-button"
                    onClick={() => console.log('Изтриване:', user.id)}
                  >
                    Изтриване
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <form onSubmit={handleAddUser} className="add-user-form panel">
        <h3>Добави Нов Потребител</h3>
        <input
          type="text"
          placeholder="Име"
          value={newUser.name}
          onChange={e => setNewUser({...newUser, name: e.target.value})}
          required
        />
        <select
          value={newUser.role}
          onChange={e => setNewUser({...newUser, role: e.target.value})}
          required
        >
          <option value="ученик">Ученик</option>
          <option value="учител">Учител</option>
          <option value="admin">Администратор</option>
        </select>
        <input
          type="text"
          placeholder="Клас (за ученици)"
          value={newUser.class}
          onChange={e => setNewUser({...newUser, class: e.target.value})}
        />
        <input
          type="password"
          placeholder="Парола"
          value={newUser.password}
          onChange={e => setNewUser({...newUser, password: e.target.value})}
          required
        />
        <input
          type="password"
          placeholder="Потвърди парола"
          value={newUser.confirmPassword}
          onChange={e => setNewUser({...newUser, confirmPassword: e.target.value})}
          required
        />
        <button type="submit">Добави</button>
      </form>
    </div>
  );
}

export default UserManagement;