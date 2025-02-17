import React, { useState, useEffect } from "react";
import Button from "../Button/Button";
import "./Settings.css";

function SettingsPanel({ setSelectedSetting }) {
  const [activeSetting, setActiveSetting] = useState(null);

  const handleColorClick = (event) => {
    const color = window.getComputedStyle(event.target).backgroundColor;
    document.documentElement.style.setProperty("--body-background-color", color);
  };

  const settings = [
    {
      id: 0,
      content: <div className="setting">Цвят</div>,
      title: "Цвят",
      setting: 
        <div id="theme-setting">
          <button
            id="blue-theme"
            onClick={(event) => handleColorClick(event)}
          ></button>
          <button
            id="purple-theme"
            onClick={(event) => handleColorClick(event)}
          ></button>
          <button
            id="yellow-theme"
            onClick={(event) => handleColorClick(event)}
          ></button>
          <button
            id="orange-theme"
            onClick={(event) => handleColorClick(event)}
          ></button>
          <button
            id="red-theme"
            onClick={(event) => handleColorClick(event)}
          ></button>
          <button
            id="pink-theme"
            onClick={(event) => handleColorClick(event)}
          ></button>
        </div>
    },
  ];

  useEffect(() => {
    setActiveSetting(null);
    setSelectedSetting(null);
  }, [setSelectedSetting]);

  const handleClick = (setting) => {
    setActiveSetting(setting);
    setSelectedSetting(setting);
  };

  return (
    <div id="settings-panel">
      <h2>Настройки</h2>
      <div id="setting-buttons">
        {settings &&
          settings.map((setting) => (
            <Button
              key={setting.id}
              content={setting.content}
              active={activeSetting && activeSetting.id === setting.id}
              onClick={() => handleClick(setting)}
            />
          ))}
      </div>
    </div>
  );
}

export default SettingsPanel;
