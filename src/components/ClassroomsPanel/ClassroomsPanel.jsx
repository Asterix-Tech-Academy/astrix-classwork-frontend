import React, { useState, useEffect } from 'react';
import Button from '../Button/Button';
import './ClassroomsPanel.css';

function ClassroomsPanel({ setSelectedClassroom, selectedClassroom }) {
  const [activeClassroom, setActiveClassroom] = useState(null);

  

  const classrooms = [
    { 
      id: 0, 
      content: <div className='classroom'>
        <div><img src='https://fakeimg.pl/20x20?text=EN'/> Английски език</div> 
        <div className='notifyIndicator active'></div>
      </div>, 
      title: "Английски език", 
      assignments: [
        { 
          id: 0, 
          title: 'Домашна работа - Урок 5', 
          description: "Прочетете текста на стр. 45 и отговорете на въпросите след него. Напишете кратко есе (200-250 думи) на тема \"My Daily Routine\".", 
          dueDate: "2025-02-23T10:30:00", 
          maxPoints: 100, 
          userPoints: "",
          submissions: [
            {
              studentName: "Пацо Пацов",
              files: [
                {name: "file1.png", url:"test"},
                {name: "file2.png", url:"test2"}
              ]
            },
            {
              studentName: "Йово Михов",
              files: [
                {name: "file1.png", url:"test"},
                {name: "file2.png", url:"test2"},
                {name: "file3.png", url:"test2"},
                {name: "file4.png", url:"test2"},
                {name: "file5.png", url:"test2"},
                {name: "file1.png", url:"test"},
                {name: "file2.png", url:"test2"},
                {name: "file3.png", url:"test2"},
                {name: "file4.png", url:"test2"},
                {name: "file5.png", url:"test2"},
              ]
            },
            {
              studentName: "Пантата",
              files: [
              ]
            }
          ]
        },
        { id: 1, title: 'Есе на тема “Как научих англиasdasdasdasdasdsadasFasfg artaegйск...',  },
        { id: 2, title:  'Презентация на тема “Какво...'},
      ],
      grades: [
        {id: 0, grade:6, onDate: "15.02.2025", teacher: "Пенка Пенкова"},
        {id: 1, grade:6, onDate: "13.02.2025", teacher: "Иванчо Иванчов"},
        {id: 2, grade:5, onDate: "07.02.2025", teacher: "Пенчо Пенчов"},
        {id: 3, grade:3, onDate: "01.02.2025", teacher: "Йово Михов"},
        {id: 4, grade:2, onDate: "31.01.2025", teacher: "Света Пенчева"},
        {id: 5, grade:2, onDate: "8.01.2025"},
        {id: 6, grade:4, onDate: "4.01.2025"},  
      ]
  },
    
    { id: 1, content: <div className='classroom'><div><img src='https://fakeimg.pl/20x20?text=EN'/> Немски език</div> <div className='notifyIndicator active'></div></div>, 
      title: "Немски език", 
      assignments: [
      { id: 0, title: 'Домашна работа - 21.02', description: "Преведете текста на стр. 69. Направете упражнения 1 - 5 след текста.", dueDate: "21.03, 23:59", maxPoints: "100", userPoints: ""},
      { id: 1, title: 'Тест' , description: "Предайте теста 5 минути преди края на часа!", dueDate: "Today, 11:55", maxPoints: "50", userPoints: ""},
    ]},
  ];

  useEffect(() => {
    if (selectedClassroom) {
      setActiveClassroom(selectedClassroom);
    }
  }, [selectedClassroom]);

  const handleClick = (classroom) => {
    setActiveClassroom(classroom);
    setSelectedClassroom(classroom);
  };

  return (
    <div id="classrooms-panel">
      <h2>Класни Стаи</h2>
      <div id="classrooms-buttons">
        {classrooms.map((classroom) => (
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
