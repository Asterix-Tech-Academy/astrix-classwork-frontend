import React, { useState, useEffect } from 'react';
import { getUserProfile, updateUserProfile, deleteUser, getAllUsers, createUser } from '../../backend/apiHelper';

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const [newUser, setNewUser] = useState({
    name: '',
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    role: 'ученик',
    classId: '', 
    subject: '',
    isClassTeacher: false,
    classTeacherOf: '',
    password_hash: '',
    confirmPassword_hash: ''
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    setTotalPages(Math.ceil(users.length / usersPerPage));
  }, [users, usersPerPage]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await getAllUsers();
      setUsers(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Не могат да бъдат извлечени потребителите: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const getCurrentUsers = () => {
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    return users.slice(indexOfFirstUser, indexOfLastUser);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    if (newUser.password_hash !== newUser.confirmPassword_hash) {
      alert('Паролите не съвпадат!');
      return;
    }
    
    const roleMapping = {
      'ученик': 'student',
      'учител': 'teacher',
      'администратор': 'admin'
    };
  
    const userData = {
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      username: newUser.username,
      role: roleMapping[newUser.role],
      password_hash: newUser.password_hash
    };
    
    if (newUser.role === 'ученик') {
      userData.classId = newUser.classId; 
    }
    
    if (newUser.role === 'учител') {
      userData.subject = newUser.subject;
      userData.isClassTeacher = newUser.isClassTeacher;
      if (newUser.isClassTeacher) {
        userData.classTeacherOf = newUser.classTeacherOf;
        userData.classId = newUser.classTeacherOf;  
      }
    }
    
    try {

      await createUser(userData);
      
      setNewUser({
        name: '',
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        role: 'ученик',
        classId: '', 
        subject: '',
        isClassTeacher: false,
        classTeacherOf: '',
        password_hash: '',
        confirmPassword_hash: ''
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

  const currentUsers = getCurrentUsers();

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
                {currentUsers.length > 0 ? (
                  currentUsers.map(user => (
                    <tr key={user.id}>
                      <td>{`${user.firstName} ${user.lastName}`}</td>
                      <td>
                        <span className={`role-badge ${user.role}`}>
                          {user.role === 'student' ? 'ученик' : 
                           user.role === 'teacher' ? 'учител' : 
                           user.role === 'admin' ? 'администратор' : user.role}
                        </span>
                      </td>
                      <td>{user.classId || user.subject}</td>
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
          
          {users.length > usersPerPage && (
            <div className="table-pagination">
              <button 
                className="pagination-button" 
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              >
                Предишна
              </button>
              <span className="pagination-info">
                Страница {currentPage} от {totalPages}
              </span>
              <button 
                className="pagination-button" 
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Следваща
              </button>
            </div>
          )}
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
              value={newUser.classId}
              onChange={e => setNewUser({...newUser, classId: e.target.value})}
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
            type="password_hash"
            placeholder="Парола"
            value={newUser.password_hash}
            onChange={e => setNewUser({...newUser, password_hash: e.target.value})}
            required
          />
        </div>

        <div className="form-group">
          <label>Потвърди парола:</label>
          <input
            type="password_hash"
            placeholder="Потвърди парола"
            value={newUser.confirmPassword_hash}
            onChange={e => setNewUser({...newUser, confirmPassword_hash: e.target.value})}
            required
          />
        </div>

        <button type="submit" className="submit-button">Добави</button>
      </form>
    </div>
  );
}

export default UserManagement;