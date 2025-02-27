import React, { useState } from 'react';

function ClassManagement() {
  const [classes] = useState([
    {
      id: 1,
      name: 'Английски език',
      teacher: 'Пенка Пенкова',
      students: ['Преслав Колев', 'Иван Иванов']
    },
    {
      id: 2,
      name: 'Немски език',
      teacher: 'Киро Киров',
      students: ['Йово Михов', 'Петя Петрова', 'Мария Маринова', 'Иван Иванов', 'Георги Георгиев', 'Иван Георгиев']
    }
  ]);

  return (
    <div className="class-management">
      <h2 style={{"marginBottom": "20px"}}>Управление на Класове</h2>     
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
  );
}

export default ClassManagement;