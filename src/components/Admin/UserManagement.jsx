import React, { useState } from 'react';

function UserManagement() {
  const [users] = useState([
    { id: 1, name: 'Преслав Колев', role: 'ученик', class: '11A' },
    { id: 2, name: 'Пенка Пенкова', role: 'учител', subjects: ['Английски'] },
    { id: 3, name: 'Ивана Петрова', role: 'ученик', class: '10Б' },
    { id: 4, name: 'Мария Димитрова', role: 'учител', subjects: ['Математика', 'Информатика'] },
    { id: 5, name: 'Стоян Николов', role: 'ученик', class: '12В' },
    { id: 6, name: 'Антон Стоянов', role: 'администратор', subjects: [] },
    { id: 7, name: 'Лилия Тодорова', role: 'учител', subjects: ['История', 'География'] },
    { id: 8, name: 'Елена Василева', role: 'ученик', class: '10A' },
    { id: 9, name: 'Петър Николаев', role: 'учител', subjects: ['Физика'] },
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
      <h2 style={{"marginBottom": "20px"}}>Управление на Потребители</h2>
      
      <div className="user-list panel">
        <h3>Текущи Потребители</h3>
        
        <div className="table-container">
          
          <table className="users-table">
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
                  <td>
                    <span className={`role-badge ${user.role}`}>
                      {user.role}
                    </span>
                  </td>
                  <td>{user.class || user.subjects?.join(', ')}</td>
                  <td className="actions-cell">
                    <button 
                      className="edit-button"
                      onClick={() => console.log('Редактиране:', user.id)}
                    >
                      <i className="icon-edit"></i> Редактиране
                    </button>
                    <button 
                      className="delete-button"
                      onClick={() => console.log('Изтриване:', user.id)}
                    >
                      <i className="icon-trash"></i> Изтриване
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <div className="table-pagination">
            <button className="pagination-button">Предишна</button>
            <span className="pagination-info">Страница 1 от 1</span>
            <button className="pagination-button">Следваща</button>
          </div>
        </div>
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
          <option value="администратор">Администратор</option>
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