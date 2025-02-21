import React, { useState } from 'react';

function ClassManagement() {
  const [classes] = useState([
    {
      id: 1,
      name: 'Английски език',
      teacher: 'Пенка Пенкова',
      students: ['Преслав Колев', 'Иван Иванов']
    }
  ]);

  return (
    <div className="class-management">
      <h2>Управление на Класове</h2>
      
      <div className="class-list panel">
        {classes.map(cls => (
          <div key={cls.id} className="class-card">
            <h3>{cls.name}</h3>
            <p>Учител: {cls.teacher}</p>
            <h4>Ученици:</h4>
            <ul>
              {cls.students.map(student => (
                <li key={student}>{student}</li>
              ))}
            </ul>
            <div className="class-actions">
              <button>Добави Ученик</button>
              <button>Премахни Ученик</button>
              <button>Смени Учител</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ClassManagement;