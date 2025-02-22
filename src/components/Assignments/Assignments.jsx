import { useEffect, useState, useMemo } from 'react';
import Button from '../Button/Button';
import './Assignments.css';
import {
  calcTruncateWinWidth,
  truncateString,
} from '../../backend/truncateString';
import { getRole } from '../profilePanel/ProfilePanel';

function Assignments({ selectedClassroom, setSelectedAssignment }) {
  const [activeAssignment, setActiveAssignment] = useState(null);
  const [truncatedAssignments, setTruncatedAssignments] = useState([]);

  const role = getRole();

  // Memoize the assignments array
  const assignments = useMemo(() => {
    return selectedClassroom?.assignments || [];
  }, [selectedClassroom?.assignments]);

  useEffect(() => {
    // Update truncated assignments when assignments change
    updateTruncateAssignments(assignments);

    // Reset active and selected assignments
    setActiveAssignment(null);
    setSelectedAssignment(null);
  }, [assignments, setSelectedAssignment]);

  useEffect(() => {
    const handleResize = () => {
      updateTruncateAssignments(assignments);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [assignments]);

  const updateTruncateAssignments = (assignments) => {
    const truncateLength = window.innerWidth <= 768 ? '9cnt' : '2.2cnt';

    const updatedAssignments = assignments.map((ass) => ({
      ...ass,
      truncTitle: truncateString(ass.title, truncateLength),
    }));
    setTruncatedAssignments(updatedAssignments);
  };

  const handleClick = (id) => {
    setActiveAssignment(id);
    setSelectedAssignment(
      truncatedAssignments.find((assignment) => assignment.id === id)
    );
  };

  return (
    <div id="assignments">
      <div id="assignments-header">
        <h1>Задания</h1>
        <p className="smallText">
          {selectedClassroom.title || 'Няма избрана класна стая'}
        </p>
      </div>

      <br />
      <br />
      <div id="not-submitted">
        {role === "ученик" && (
          <h2>Непредадени</h2>
        )}

        <div className="horizontal-layout">
          <div className="vertical-line"></div>
          <div className="assignments-list">
            {truncatedAssignments.map((assignment) => (
              <Button
                key={assignment.id}
                content={assignment.truncTitle}
                active={activeAssignment === assignment.id}
                onClick={() => handleClick(assignment.id)}
                />
              ))}
          </div>
        </div>
      </div>
      {role === "учител" && (
        <div id='addButton'>
          <Button content="Добави задание"></Button>
        </div>
      )}
    </div>
  );
}

export default Assignments;
