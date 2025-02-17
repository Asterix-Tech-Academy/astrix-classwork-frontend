import React, { useEffect, useState, useRef } from 'react';
import Button from '../Button/Button';
import './NavMenu.css';
import Lottie from 'lottie-react';
import menuAnimation from './Menu.json';
import gradesAnimation from './Grades.json';
import tasksAnimation from './Tasks.json';

function NavMenu({activeButton, setActiveButton}) {
  const lottieRef = useRef();
  const gradesRef = useRef();
  const tasksRef = useRef();

  const handleClick = (id) => {
    if (id === 'settings') {
      lottieRef.current?.stop();
      lottieRef.current?.play();
      if (activeButton === 'grades') {
        gradesRef.current?.setDirection(-1);
        gradesRef.current?.play();
      }
    }
    else if (id === 'grades') {
      gradesRef.current?.setDirection(1);
      gradesRef.current?.stop();
      gradesRef.current?.play();
    }
    else if (id === 'tasks') {
      tasksRef.current?.setDirection(1);
      tasksRef.current?.stop();
      tasksRef.current?.play();
      if (activeButton === 'grades') {
        gradesRef.current?.setDirection(-1);
        gradesRef.current?.play();
      }
    }
    setActiveButton(id);
  };

  const buttons = [
    { 
      id: 'tasks', 
      content: <Lottie 
        lottieRef={tasksRef}
        animationData={tasksAnimation}
        loop={false}
        autoplay={false}
        style={{ width: 30, height: 29.5 }}
        initialSegment={[0, 70]}
      />
    },
    { 
      id: 'grades', 
      content: <Lottie 
        lottieRef={gradesRef}
        animationData={gradesAnimation}
        loop={false}
        autoplay={false}
        style={{ width: 30, height: 30 }}
        initialSegment={[0, 70]}
      />
    },
    { 
      id: 'settings', 
      content: <Lottie 
        lottieRef={lottieRef}
        animationData={menuAnimation}
        loop={false}
        autoplay={false}
        style={{ width: 35, height: 35 }}
        initialSegment={[0, 50]}
      /> 
    },
  ];

  useEffect(() => {
    setActiveButton(buttons[0].id);
  }, []); 

  return (
    <div id="navmenu">
      {buttons.map((button) => (
        <Button
          key={button.id}
          content={button.content}
          active={activeButton === button.id}
          onClick={() => handleClick(button.id)}
        />
      ))}
    </div>
  );
}

export default NavMenu;