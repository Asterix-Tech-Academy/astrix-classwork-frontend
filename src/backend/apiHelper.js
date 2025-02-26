const API_URL = 'http://localhost:8080';

const apiRequest = async (endpoint, method = 'GET', body = null) => {
  const headers = {
    'Content-Type': 'application/json'
  };

  const config = {
    method,
    headers
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Request failed with status ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`API Error: ${error.message}`);
    throw error;
  }
};

// Authentication endpoints
export const register = async (userData) => {
  try {
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    
    // Check if response is JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      // Get the text response to include in the error
      const textResponse = await response.text();
      throw new Error(`Server returned non-JSON response: ${textResponse}`);
    }
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Registration failed');
    }
    
    return data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};
export const login = (credentials) => apiRequest('/login', 'POST', credentials);
export const logout = () => {
  localStorage.removeItem('user');
  return apiRequest('/logout');
};

// Homework Management endpoints
export const createHomework = (homeworkData) => apiRequest('/homeworks', 'POST', homeworkData);
export const getHomework = (id) => apiRequest(`/homeworks/${id}`);
export const updateHomework = (id, homeworkData) => apiRequest(`/homeworks/${id}`, 'PUT', homeworkData);
export const deleteHomework = (id) => apiRequest(`/homeworks/${id}`, 'DELETE');

// Homework Submission endpoints
export const submitHomework = (submissionData) => apiRequest('/submit-homework', 'POST', submissionData);
export const getSubmittedHomework = (id) => apiRequest(`/submitted-homeworks/${id}`);

// Grade Management endpoints
export const getGrade = (id) => apiRequest(`/grades/${id}`);
export const updateGrade = (id, gradeData) => apiRequest(`/grades/${id}`, 'PUT', gradeData);
export const generateReport = (reportData) => apiRequest('/reports/generate', 'POST', reportData);
export const getReport = (reportId) => apiRequest(`/reports/${reportId}`);
export const getAllReports = () => apiRequest('/reports');

// User Management endpoints
export const getUserProfile = (id) => apiRequest(`/users/${id}`);
export const updateUserProfile = (id, userData) => apiRequest(`/users/${id}`, 'PUT', userData);
export const deleteUser = (id) => apiRequest(`/users/${id}`, 'DELETE');

// Class Management endpoints
export const getAllClasses = () => apiRequest('/classes');
export const getClass = (id) => apiRequest(`/classes/${id}`);
export const getClassStudents = (id) => apiRequest(`/classes/${id}/students`);
export const getClassTeachers = (id) => apiRequest(`/classes/${id}/teachers`);
export const assignStudentToClass = (classId, studentId) => 
  apiRequest(`/classes/${classId}/assign-student`, 'POST', { studentId });
export const assignTeacherToClass = (classId, teacherId) => 
  apiRequest(`/classes/${classId}/assign-teacher`, 'POST', { teacherId });
export const removeStudentFromClass = (classId, studentId) => 
  apiRequest(`/classes/${classId}/remove-student`, 'POST', { studentId });
export const removeTeacherFromClass = (classId, teacherId) => 
  apiRequest(`/classes/${classId}/remove-teacher`, 'POST', { teacherId });