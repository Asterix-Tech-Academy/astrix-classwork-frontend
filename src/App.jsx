import React, { useState, useCallback, useRef } from 'react';
import Lottie from 'lottie-react';
import backAnimation from './back.json';
import './App.css';
import ClassroomsPanel from './components/ClassroomsPanel/ClassroomsPanel';
import NavMenu from './components/NavMenu/NavMenu';
import ProfilePanel from './components/ProfilePanel/ProfilePanel';
import Assignments from './components/Assignments/Assignments';
import AssignmentDetails from './components/Assignments/AssignmentDetails';
import Grades from './components/Grades/Grades';
import SettingsPanel from './components/Settings/SettingsPanel';
import Settings from './components/Settings/Settings';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminDashboard from './components/Admin/AdminDashboard';

const BackButton = ({ onClick, text }) => {
  const backRef = useRef();

  const handleClick = () => {
    backRef.current?.stop();
    backRef.current?.play();
    setTimeout(() => {
      onClick();
    }, 500);
  };

  return (
    <button className="back-button" onClick={handleClick}>
      <Lottie 
        lottieRef={backRef}
        animationData={backAnimation}
        loop={false}
        autoplay={false}
        style={{ width: 80, height: 80, padding: -50 }}
        initialSegment={[0, 25]}
      />
      {text}
    </button>
  );
};

function App() {
  const [activeTab, setActiveTab] = useState('tasks');
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [selectedClassroom, setSelectedClassroom] = useState(null);
  const [isMobileContentVisible, setIsMobileContentVisible] = useState(false);
  const [selectedSetting, setSelectedSetting] = useState(null);

  const handleClassroomSelect = (classroom) => {
    setSelectedClassroom(classroom);
    setIsMobileContentVisible(true);
  };

  const handleBackClick = () => {
    if (selectedAssignment) {
      setSelectedAssignment(null);
    } else {
      setIsMobileContentVisible(false);
    }
  };

  const setSelectedAssignmentCallback = useCallback(
    (assignment) => {
      setSelectedAssignment(assignment);
    },
    [setSelectedAssignment]
  );

  const renderSidebarContent = () => {
    switch (activeTab) {
      case 'tasks':
        return <ClassroomsPanel setSelectedClassroom={handleClassroomSelect} />;
      case 'grades':
        return <ClassroomsPanel setSelectedClassroom={handleClassroomSelect} />;
      case 'settings':
        return <SettingsPanel setSelectedSetting={setSelectedSetting} />;
      default:
        return <p>Моля селектирайте поле</p>;
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div
            className={`dashboard ${
              isMobileContentVisible ? 'mobile-content-visible' : ''
            } ${selectedAssignment ? 'assignment-selected' : ''}`}
          >
            <aside className="sidebar">
              <div>
                <ProfilePanel
                  name="Преслав Колев"
                  imageUrl="https://fakeimg.pl/32x32?text=profile"
                  type="ученик"
                />

                <NavMenu activeButton={activeTab} setActiveButton={setActiveTab} />

                <div id="sidebar-content">{renderSidebarContent()}</div>
              </div>
            </aside>

            <main className="content">
              <section
                className="content-left panel"
                style={{ display: activeTab === 'tasks' ? 'block' : 'none' }}
              >
                {isMobileContentVisible && !selectedAssignment && (
                  <BackButton onClick={handleBackClick} text="Назад към класни стаи" />
                )}
                {activeTab === 'tasks' && (
                  <Assignments
                    selectedClassroom={
                      selectedClassroom || 'Няма избрана класна стая'
                    }
                    setSelectedAssignment={setSelectedAssignmentCallback}
                  />
                )}
              </section>

              <section
                className="content-right panel"
                style={{
                  gridColumn: activeTab !== 'tasks' ? '1 / span 2' : '2',
                }}
              >
                {activeTab === 'tasks' && (
                  <>
                    {selectedAssignment && (
                      <BackButton onClick={handleBackClick} text="Назад към задания" />
                    )}
                    <AssignmentDetails assignment={selectedAssignment} />
                  </>
                )}
                {activeTab === 'grades' && (
                  <>
                    {isMobileContentVisible && (
                      <BackButton onClick={handleBackClick} text="Назад към класни стаи" />
                    )}
                    <Grades selectedClassroom={selectedClassroom} />
                  </>
                )}
                {activeTab === 'settings' && (
                  <Settings selectedSetting={selectedSetting} />
                )}
              </section>
            </main>
          </div>
        } />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
