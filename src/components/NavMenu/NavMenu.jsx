import React, { useEffect, useState } from 'react';
import Button from '../Button/Button';
import './NavMenu.css';

function NavMenu({activeButton, setActiveButton}) {
  const handleClick = (id) => {
    setActiveButton(id);
  };

  const buttons = [
    { id: 'tasks', content: <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50"><path fill="currentColor" d="M30 8v33H6V8zm4-4H2v42h32zM9 12h18v4H9zm0 7h18v4H9zm0 7h18v4H9zm0 7h18v4H9zm31-21h8v28h-8zm4.006-11C41.812 1 40 2.765 40 4.937V9h8V4.937C48 2.765 46.191 1 44.006 1m-4.068 42l4.041 6.387L48 43z"/></svg> },
    { id: 'grades', content: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M16 4L3 7v2l13-3l13 3V7zm-6 6c-3.227 0-6.375 1.313-6.375 1.313l-.625.28V27h11.281c.348.598.98 1 1.719 1c.738 0 1.371-.402 1.719-1H29V11.594l-.625-.281S25.227 10 22 10c-2.918 0-5.48.98-6 1.188C15.48 10.98 12.918 10 10 10m0 2c1.934 0 4 .625 5 .969v11.125c-1.113-.367-2.941-.875-5-.875c-2.102 0-3.813.484-5 .875V12.969C5.77 12.69 7.8 12 10 12m12 0c2.2 0 4.23.691 5 .969v11.125c-1.188-.39-2.898-.875-5-.875c-2.059 0-3.887.508-5 .875V12.969c1-.344 3.066-.969 5-.969"/></svg> },
    { id: 'settings', content: <svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"><path d="M 48.000002,16 H 208 c 17.728,0 32,14.272 32,32 v 160 c 0,17.728 -14.272,32 -32,32 H 48.000002 c -17.728,0 -32,-14.272 -32,-32 V 48 c 0,-17.728 14.272,-32 32,-32 z"/><path d="M 64.000006,64.000001 H 79.999993"/><path d="m 79.999996,-96.000015 a 16,16 0 0 1 -16,16 16,16 0 0 1 -16,-16 16,16 0 0 1 16,-16.000005 16,16 0 0 1 16,16.000005 z" transform="rotate(90)"/><path d="m 112.00001,64.000353 79.99997,-3.52e-4"/><path d="M 191.99998,128 H 176"/><path d="m 144,159.99997 a 16,16 0 0 1 -16,16 16,16 0 0 1 -16,-16 16,16 0 0 1 16,-16 16,16 0 0 1 16,16 z" transform="matrix(0 1 1 0 0 0)"/><path d="M 143.99998,128.00035 64.000006,128"/><path d="M 64.000006,192.00001 H 79.999993"/><path d="m 208,-96.000015 a 16,16 0 0 1 -16,16 16,16 0 0 1 -16,-16 16,16 0 0 1 16,-16.000005 16,16 0 0 1 16,16.000005 z" transform="rotate(90)"/><path d="m 112.00001,192.00036 79.99997,-3.5e-4"/></g></svg> },
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