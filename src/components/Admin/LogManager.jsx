import React, { useState } from 'react';

// Mock data for testing
const mockLogs = [
  {
    id: 1,
    timestamp: '2025-02-24T10:30:00',
    type: 'login',
    user: 'Преслав Колев',
    details: 'Успешно влизане в системата'
  },
  {
    id: 2,
    timestamp: '2025-02-24T11:15:00',
    type: 'grade',
    user: 'Пенка Пенкова',
    details: 'Добави оценка 6 на Иван Иванов по Английски език'
  },
  {
    id: 3,
    timestamp: '2025-02-24T12:00:00',
    type: 'assignment',
    user: 'Пенка Пенкова',
    details: 'Създаде ново домашно "Present Simple" за клас 11A'
  },
  {
    id: 4,
    timestamp: '2025-02-24T13:45:00',
    type: 'logout',
    user: 'Преслав Колев',
    details: 'Излизане от системата'
  }
];

function LogManager() {
  const [logs] = useState(mockLogs);
  const [filter, setFilter] = useState('all');

  const filteredLogs = filter === 'all' 
    ? logs 
    : logs.filter(log => log.type === filter);

  const getLogTypeStyle = (type) => {
    const styles = {
      login: { color: '#2ecc71' },
      logout: { color: '#95a5a6' },
      grade: { color: '#f1c40f' },
      assignment: { color: '#3498db' }
    };
    return styles[type] || {};
  };

  return (
    <div className="log-management">
      <h2>Системен Журнал</h2>
      
      <div className="log-filters panel">
        <button 
          className={filter === 'all' ? 'active' : ''} 
          onClick={() => setFilter('all')}
        >
          Всички
        </button>
        <button 
          className={filter === 'login' ? 'active' : ''} 
          onClick={() => setFilter('login')}
        >
          Влизания
        </button>
        <button 
          className={filter === 'grade' ? 'active' : ''} 
          onClick={() => setFilter('grade')}
        >
          Оценки
        </button>
        <button 
          className={filter === 'assignment' ? 'active' : ''} 
          onClick={() => setFilter('assignment')}
        >
          Задания
        </button>
      </div>

      <div className="logs-list panel">
        <table className="logs-table">
          <thead>
            <tr>
              <th>Време</th>
              <th>Тип</th>
              <th>Потребител</th>
              <th>Детайли</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map((log) => (
              <tr key={log.id}>
                <td>{new Date(log.timestamp).toLocaleString('bg-BG')}</td>
                <td style={getLogTypeStyle(log.type)}>
                  {log.type === 'login' && 'Влизане'}
                  {log.type === 'logout' && 'Излизане'}
                  {log.type === 'grade' && 'Оценка'}
                  {log.type === 'assignment' && 'Задание'}
                </td>
                <td>{log.user}</td>
                <td>{log.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LogManager;