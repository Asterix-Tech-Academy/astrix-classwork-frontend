import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '', // Add username to initial state
    password: '',
    confirmPassword: '',
    userType: 'student',
    firstName: '',
    lastName: '',
    classroom: '',
    isClassTeacher: false,
    classTeacherOf: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    console.log('Registration data:', formData);
    navigate('/login');
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Register</h2>
        <div className="form-group">
          <label>User Type:</label>
          <select 
            name="userType"
            value={formData.userType}
            onChange={handleChange}
          >
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>
        </div>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        {formData.userType === 'teacher' && (
          <>
            <div className="form-group">
              <label>Subject/Classroom:</label>
              <input
                type="text"
                name="classroom"
                value={formData.classroom}
                onChange={handleChange}
                placeholder="Enter your subject"
                required={formData.userType === 'teacher'}
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
                <span>I am a Class Teacher</span>
              </label>
            </div>

            {formData.isClassTeacher && (
              <div className="form-group">
                <label>Class Teacher Of:</label>
                <input
                  type="text"
                  name="classTeacherOf"
                  value={formData.classTeacherOf}
                  onChange={handleChange}
                  placeholder="Enter class (e.g., 10Б)"
                  required={formData.isClassTeacher}
                />
              </div>
            )}
          </>
        )}

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;