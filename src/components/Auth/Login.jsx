import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../backend/apiHelper';
import './Auth.css';

const Login = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    try {
      setIsLoading(true);
      
      const credentials = {
        identifier,
        password,
        role
      };

      const response = await login(credentials);
      console.log('Успешно влизане:', response);
    
      localStorage.setItem('user', JSON.stringify(response));
      
      switch(response.role) {
        case 'admin':
          navigate('/admin');
          break;
        case 'teacher':
          navigate('/');
          break;
        default:
          navigate('/');
      }
    } catch (err) {
      setError(err.message || 'Неуспешно влизане. Моля, проверете вашите данни.');
      console.error('Грешка при влизане:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Вход</h2>
        {error && <div className="error-message">{error}</div>}
        
        <div className="form-group">
          <label htmlFor="role-select">Влизане като:</label>
          <select 
            id="role-select"
            className="role-dropdown"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="student">Ученик</option>
            <option value="teacher">Учител</option>
            <option value="admin">Администратор</option>
          </select>
        </div>
        
        <div className="form-group">
          <label>Имейл или потребителско име:</label>
          <input
            type="text"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Парола:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Влизане...' : 'Вход'}
        </button>
      </form>
    </div>
  );
};

export default Login;