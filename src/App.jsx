import React, { useState } from 'react';
import './App.css';
import ClassroomsPanel from './components/ClassroomsPanel/ClassroomsPanel';
import NavMenu from './components/NavMenu/NavMenu';
import ProfilePanel from './components/ProfilePanel/ProfilePanel';
import Assignments from './components/Assignments/Assignments';
import AssignmentDetails from './components/Assignments/AssignmentDetails';

function App() {
  const [activeTab, setActiveTab] = useState('tasks');
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [selectedClassroom, setSelectedClassroom] = useState(null);
  const [isMobileContentVisible, setIsMobileContentVisible] = useState(false);

  const handleClassroomSelect = (classroom) => {
    setSelectedClassroom(classroom);
    setIsMobileContentVisible(true);
  };

  const handleBackClick = () => {
    setIsMobileContentVisible(false);
  };

  const renderSidebarContent = () => {
    switch (activeTab) {
      case 'tasks':
        return <ClassroomsPanel setSelectedClassroom={handleClassroomSelect} />;
      case 'grades':
        return <ClassroomsPanel setSelectedClassroom={handleClassroomSelect} />;
      case 'settings':
        return <p>Settings Panel</p>;
      default:
        return <p>Моля селектирайте поле</p>;
    }
  };

  return (
    <div className={`dashboard ${isMobileContentVisible ? 'mobile-content-visible' : ''}`}>
      <aside className="sidebar">
        <div>
          <ProfilePanel
            name="Преслав Колев"
            imageUrl="https://fakeimg.pl/32x32?text=profile"
            type="ученик"
          />

          <NavMenu activeButton={activeTab} setActiveButton={setActiveTab} />

          <div id='sidebar-content'>{renderSidebarContent()}</div>
        </div>
      </aside>

      <main className="content">
        <section className="content-left panel">
          {isMobileContentVisible && (
            <button className="back-button" onClick={handleBackClick}>
              ← Назад
            </button>
          )}
          <Assignments 
            selectedClassroom={selectedClassroom || "Няма избрана класна стая"}
            setSelectedAssignment={setSelectedAssignment}
          />
        </section>

        <section className="content-right panel">
          <AssignmentDetails assignment={selectedAssignment} />
        </section>
      </main>
    </div>
  );
}

export default App;
