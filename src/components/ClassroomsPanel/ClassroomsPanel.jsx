import React, { useState, useEffect } from 'react';
import Button from '../Button/Button';
import './ClassroomsPanel.css';

function ClassroomsPanel({ setSelectedClassroom }) {
  const [activeClassroom, setActiveClassroom] = useState(null);

  const classrooms = [
    { id: 0, content: <div className='classroom'><div><img src='https://fakeimg.pl/20x20?text=EN'/> Английски език</div> <div className='notifyIndicator active'></div></div>, 
      title: "Английски език", 
      assignments: [
      { id: 0, title: 'Домашна работа - 11.02', description: "123", dueDate: "23.03, 10:30", maxPoints: "100", userPoints: ""},
      { id: 1, title: 'Есе на тема “Как научих англиasdasdasdasdasdsadasFasfg artaegйск...' },
      { id: 2, title:  'Презентация на тема “Какво...'},
    ]},
    { id: 1, content: <div className='classroom'><div><img src='https://fakeimg.pl/20x20?text=EN'/> Немски език</div> <div className='notifyIndicator active'></div></div>, 
      title: "Немски език", 
      assignments: [
      { id: 0, title: 'Домашна работа - 21.02', description: "Преведете текста на стр. 69. Направете упражнения 1 - 5 след текста.", dueDate: "21.03, 23:59", maxPoints: "100", userPoints: ""},
      { id: 1, title: 'Тест' , description: "Предайте теста 5 минути преди края на часа!", dueDate: "Today, 11:55", maxPoints: "50", userPoints: ""},
    ]},
  ];

  useEffect(() => {
    if (classrooms && classrooms.length > 0) {
      setActiveClassroom(classrooms[0]); 
      setSelectedClassroom(classrooms[0]);
    }
  }, [setSelectedClassroom]);

  const handleClick = (classroom) => {
    setActiveClassroom(classroom);
    setSelectedClassroom(classroom); 
  };

  return (
    <div id="classrooms-panel">
      <h2>Класни Стаи</h2>
      <div id="classrooms-buttons">
        {classrooms && classrooms.map((classroom) => (
          <Button
            key={classroom.id}
            content={classroom.content}
            active={activeClassroom && activeClassroom.id === classroom.id} 
            onClick={() => handleClick(classroom)}
          />
        ))}
      </div>
    </div>
  );
}

export default ClassroomsPanel;