import React, { useState, useEffect } from 'react';
import { getUserProfile, updateUserProfile, deleteUser } from '../../backend/apiHelper';

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [newUser, setNewUser] = useState({
    name: '',
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    role: 'ученик',
    class: '',
    subject: '',
    isClassTeacher: false,
    classTeacherOf: '',
    password: '',
    confirmPassword: ''
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/');
      if (!response.ok) {
        throw new Error('Проблем при извличане на потребителите');
      }
      const data = await response.json();
      setUsers(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Не могат да бъдат извлечени потребителите: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    if (newUser.password !== newUser.confirmPassword) {
      alert('Паролите не съвпадат!');
      return;
    }
    
    const userData = {
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      username: newUser.username,
      role: newUser.role,
      password: newUser.password
    };
    
    if (newUser.role === 'ученик') {
      userData.class = newUser.class;
    }
    
    if (newUser.role === 'учител') {
      userData.subjects = [newUser.subject]; 
      if (newUser.isClassTeacher) {
        userData.classTeacherOf = newUser.classTeacherOf;
      }
    }
    
    try {
      const response = await fetch('http://localhost:8080/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Проблем при създаване на потребител');
      }
      
      setNewUser({
        name: '',
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        role: 'ученик',
        class: '',
        subject: '',
        isClassTeacher: false,
        classTeacherOf: '',
        password: '',
        confirmPassword: ''
      });
      
      fetchUsers();
      alert('Потребителят е създаден успешно!');
    } catch (err) {
      alert('Грешка при създаване на потребител: ' + err.message);
    }
  };

  const handleEditUser = async (id) => {
    try {
      const user = await getUserProfile(id);
      console.log('User to edit:', user);
    } catch (err) {
      alert('Грешка при зареждане на данните за потребител: ' + err.message);
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm('Сигурни ли сте, че искате да изтриете този потребител?')) {
      try {
        await deleteUser(id);
        fetchUsers();
        alert('Потребителят е изтрит успешно!');
      } catch (err) {
        alert('Грешка при изтриване на потребител: ' + err.message);
      }
    }
  };

  return (
    <div className="user-management">
      <h2 style={{"marginBottom": "20px"}}>Управление на Потребители</h2>
      
      <div className="user-list panel">
        <h3>Текущи Потребители</h3>
        
        <div className="table-container">
          {loading && <p>Зареждане на потребители...</p>}
          {error && <p className="error-message">{error}</p>}
          
          {!loading && !error && (
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
                {users.length > 0 ? (
                  users.map(user => (
                    <tr key={user.id}>
                      <td>{`${user.firstName} ${user.lastName}`}</td>
                      <td>
                        <span className={`role-badge ${user.role}`}>
                          {user.role}
                        </span>
                      </td>
                      <td>{user.class || user.subjects?.join(', ')}</td>
                      <td className="actions-cell">
                        <button 
                          className="edit-button"
                          onClick={() => handleEditUser(user.id)}
                        >
                          <i className="icon-edit"></i> Редактиране
                        </button>
                        <button 
                          className="delete-button"
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          <i className="icon-trash"></i> Изтриване
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" style={{textAlign: 'center'}}>Няма намерени потребители</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
          
          <div className="table-pagination">
            <button className="pagination-button">Предишна</button>
            <span className="pagination-info">Страница 1 от 1</span>
            <button className="pagination-button">Следваща</button>
          </div>
        </div>
      </div>

      <form onSubmit={handleAddUser} className="add-user-form panel">
        <h3>Добави Нов Потребител</h3>
        
        <div className="form-group">
          <label>Тип потребител:</label>
          <select
            value={newUser.role}
            onChange={e => setNewUser({...newUser, role: e.target.value})}
            required
          >
            <option value="ученик">Ученик</option>
            <option value="учител">Учител</option>
            <option value="администратор">Администратор</option>
          </select>
        </div>

        <div className="form-group">
          <label>Потребителско име:</label>
          <input
            type="text"
            placeholder="Потребителско име"
            value={newUser.username}
            onChange={e => setNewUser({...newUser, username: e.target.value})}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Име:</label>
            <input
              type="text"
              placeholder="Име"
              value={newUser.firstName}
              onChange={e => setNewUser({...newUser, firstName: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label>Фамилия:</label>
            <input
              type="text"
              placeholder="Фамилия"
              value={newUser.lastName}
              onChange={e => setNewUser({...newUser, lastName: e.target.value})}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Имейл:</label>
          <input
            type="email"
            placeholder="Имейл"
            value={newUser.email}
            onChange={e => setNewUser({...newUser, email: e.target.value})}
            required
          />
        </div>
        
        {newUser.role === 'ученик' && (
          <div className="form-group">
            <label>Клас:</label>
            <input
              type="text"
              placeholder="Въведете клас (напр., 10Б)"
              value={newUser.class}
              onChange={e => setNewUser({...newUser, class: e.target.value})}
              required
            />
          </div>
        )}

        {newUser.role === 'учител' && (
          <>
            <div className="form-group">
              <label>Предмет:</label>
              <input
                type="text"
                placeholder="Въведете предмет"
                value={newUser.subject}
                onChange={e => setNewUser({...newUser, subject: e.target.value})}
                required
              />
            </div>

            <div className="form-group checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={newUser.isClassTeacher}
                  onChange={e => {
                    const isChecked = e.target.checked;
                    setNewUser({
                      ...newUser, 
                      isClassTeacher: isChecked,
                      classTeacherOf: isChecked ? newUser.classTeacherOf : ''
                    });
                  }}
                />
                <span>Класен ръководител</span>
              </label>
            </div>

            {newUser.isClassTeacher && (
              <div className="form-group">
                <label>Класен ръководител на:</label>
                <input
                  type="text"
                  placeholder="Въведете клас (напр., 10Б)"
                  value={newUser.classTeacherOf}
                  onChange={e => setNewUser({...newUser, classTeacherOf: e.target.value})}
                  required
                />
              </div>
            )}
          </>
        )}

        <div className="form-group">
          <label>Парола:</label>
          <input
            type="password"
            placeholder="Парола"
            value={newUser.password}
            onChange={e => setNewUser({...newUser, password: e.target.value})}
            required
          />
        </div>

        <div className="form-group">
          <label>Потвърди парола:</label>
          <input
            type="password"
            placeholder="Потвърди парола"
            value={newUser.confirmPassword}
            onChange={e => setNewUser({...newUser, confirmPassword: e.target.value})}
            required
          />
        </div>

        <button type="submit" className="submit-button">Добави</button>
      </form>
    </div>
  );
}

export default UserManagement;