import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../backend/apiHelper';
import './Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '', 
    password: '',
    confirmPassword: '',
    role: 'student',
    firstName: '',
    lastName: '',
    subject: '',
    isClassTeacher: false,
    classTeacherOf: '',
    className: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    if (formData.password !== formData.confirmPassword) {
      setError("Паролите не съвпадат!");
      return;
    }

    try {
      setIsLoading(true);
      
      const userData = {
        email: formData.email,
        username: formData.username,
        password: formData.password,
        role: formData.role, 
        firstName: formData.firstName,
        lastName: formData.lastName
      };

      if (formData.role === 'teacher') { 
        userData.subject = formData.subject;
        userData.isClassTeacher = formData.isClassTeacher;
        if (formData.isClassTeacher) {
          userData.classTeacherOf = formData.classTeacherOf;
          userData.className = formData.classTeacherOf;
        }
      } else if (formData.role === 'student') {
        userData.className = formData.className;
      }

      const response = await register(userData);
      console.log('Registration successful:', response);
      
      navigate('/login');
    } catch (err) {
      setError(err.message || 'Регистрацията е неуспешна. Моля, опитайте отново.');
      console.error('Registration error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Регистрация</h2>
        {error && <div className="error-message">{error}</div>}
        <div className="form-group">
          <label>Тип потребител:</label>
          <select 
            name="role"
            value={formData.role} 
            onChange={handleChange}
          >
            <option value="student">Ученик</option>
            <option value="teacher">Учител</option>
          </select>
        </div>
        <div className="form-group">
          <label>Потребителско име:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Име:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Фамилия:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Имейл:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Парола:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Потвърди парола:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        {formData.role === 'student' && (
          <div className="form-group">
            <label>Клас:</label>
            <input
              type="text"
              name="className"
              value={formData.className}
              onChange={handleChange}
              placeholder="Въведете вашия клас (напр., 10Б)"
              required={formData.role === 'student'}
            />
          </div>
        )}

        {formData.role === 'teacher' && (
          <>
            <div className="form-group">
              <label>Предмет:</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Въведете вашия предмет"
                required={formData.role === 'teacher'}
              />
            </div>

            <div className="form-group checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="isClassTeacher"
                  checked={formData.isClassTeacher}
                  onChange={(e) => {
                    const isChecked = e.target.checked;
                    setFormData({
                      ...formData,
                      isClassTeacher: isChecked,
                      classTeacherOf: isChecked ? formData.classTeacherOf : ''
                    });
                  }}
                />
                <span>Аз съм класен ръководител</span>
              </label>
            </div>

            {formData.isClassTeacher && (
              <div className="form-group">
                <label>Класен ръководител на:</label>
                <input
                  type="text"
                  name="classTeacherOf"
                  value={formData.classTeacherOf}
                  onChange={handleChange}
                  placeholder="Въведете клас (напр., 10Б)"
                  required={formData.isClassTeacher}
                />
              </div>
            )}
          </>
        )}

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Регистриране...' : 'Регистрирай се'}
        </button>
      </form>
    </div>
  );
};

export default Register;