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
      const errorText = await response.text();
      let errorData = {};
      try {
        errorData = JSON.parse(errorText);
      } catch (e) {
        throw new Error(errorText || `Request failed with status ${response.status}`);
      }
      throw new Error(errorData.message || `Request failed with status ${response.status}`);
    }
    
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    } else {
      const text = await response.text();
      return { message: text };
    }
  } catch (error) {
    console.error(`API Error: ${error.message}`);
    throw error;
  }
};

export const register = (userData) => apiRequest('/register', 'POST', userData);
export const login = (credentials) => apiRequest('/login', 'POST', credentials);
export const logout = () => {
  localStorage.removeItem('user');
  return apiRequest('/logout');
};
 
export const createHomework = (homeworkData) => apiRequest('/homeworks', 'POST', homeworkData);
export const getHomework = (id) => apiRequest(`/homeworks/${id}`);
export const updateHomework = (id, homeworkData) => apiRequest(`/homeworks/${id}`, 'PUT', homeworkData);
export const deleteHomework = (id) => apiRequest(`/homeworks/${id}`, 'DELETE');

export const submitHomework = (submissionData) => apiRequest('/submit-homework', 'POST', submissionData);
export const getSubmittedHomework = (id) => apiRequest(`/submitted-homeworks/${id}`);

export const getGrade = (id) => apiRequest(`/grades/${id}`);
export const updateGrade = (id, gradeData) => apiRequest(`/grades/${id}`, 'PUT', gradeData);
export const generateReport = (reportData) => apiRequest('/reports/generate', 'POST', reportData);
export const getReport = (reportId) => apiRequest(`/reports/${reportId}`);
export const getAllReports = () => apiRequest('/reports');

export const getUserProfile = (id) => apiRequest(`/users/${id}`);
export const updateUserProfile = (id, userData) => apiRequest(`/users/${id}`, 'PUT', userData);
export const deleteUser = (id) => apiRequest(`/users/${id}`, 'DELETE');

export const getAllUsers = () => apiRequest('/users');
export const createUser = (userData) => apiRequest('/users', 'POST', userData);

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