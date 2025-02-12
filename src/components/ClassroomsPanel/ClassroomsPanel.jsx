import React, { useState, useEffect } from 'react';
import Button from '../Button/Button';
import './ClassroomsPanel.css';

function ClassroomsPanel() {
  const [activeClassroom, setActiveClassroom] = useState(null);

  const classrooms = [
    { id: 0, content: <div className='classroom'><div><img src='https://fakeimg.pl/20x20?text=EN'/> Английски език</div> <div className='notifyIndicator active'></div></div> },
    { id: 1, content: <div className='classroom'><div><img src='https://fakeimg.pl/20x20?text=DT'/> Немски език</div> <div className='notifyIndicator active'></div></div> },
    { id: 2, content: <div className='classroom'><div><img src='https://fakeimg.pl/20x20?text=MATH'/> Математика </div> <div className='notifyIndicator'></div></div> },
  ]

  useEffect(() => {
    if (classrooms && classrooms.length > 0) {
      setActiveClassroom(classrooms[0].id);
    }
  }, []);

  const handleClick = (id) => {
    setActiveClassroom(id);
  };

  return (
    <div id="classrooms-panel">
      <h2>Класни Стаи</h2>
      <div id="classrooms-buttons">
        {classrooms && classrooms.map((classroom) => (
          <Button
            key={classroom.id}
            content={classroom.content}
            active={activeClassroom === classroom.id}
            onClick={() => handleClick(classroom.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default ClassroomsPanel;