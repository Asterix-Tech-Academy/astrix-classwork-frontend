import React from "react";
import "./Settings.css";

function Settings({ selectedSetting }) {
  return (
    <div id="settings">
      <div id="settings-header" className="horizontal-layout">
        <h1>Настройки</h1>
        <p className="smallText">
          {selectedSetting?.title || "Няма избрана настройка"}
        </p>
      </div>

      {selectedSetting?.setting}
    </div>
  );
}

export default Settings;
