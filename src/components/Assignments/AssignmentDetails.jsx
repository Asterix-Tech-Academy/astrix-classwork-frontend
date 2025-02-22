import Button from "../Button/Button";
import { getRole } from '../profilePanel/ProfilePanel';
import { useState } from 'react';

const formatDueDate = (dueDate) => {
  const today = new Date();
  const due = new Date(dueDate);
  
  // Reset time part for accurate day comparison
  today.setHours(0, 0, 0, 0);
  due.setHours(0, 0, 0, 0);
  
  const diffDays = Math.floor((due - today) / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return "Днес";
  if (diffDays === 1) return "Утре";
  if (diffDays === -1) return "Вчера";
  
  // Format as DD.MM for other dates
  return due.toLocaleDateString('bg-BG', {
    day: '2-digit',
    month: '2-digit'
  });
};

const getDueDateClass = (dueDate) => {
  const today = new Date();
  const due = new Date(dueDate);
  const diffDays = Math.floor((due - today) / (1000 * 60 * 60 * 24));
  
  if (diffDays < 0) return 'danger';
  if (diffDays <= 2) return 'warning';
  return '';
};

const getPointsClass = (userPoints, maxPoints) => {
  if (!userPoints) return '';
  const percentage = (userPoints / maxPoints) * 100;
  if (percentage < 50) return 'danger';
  if (percentage < 70) return 'warning';
  return '';
};

const AssignmentDetails = ({ assignment }) => {
  const [points, setPoints] = useState({});
  const role = getRole();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    description: assignment?.description || "",
    maxPoints: assignment?.maxPoints || 0,
    dueDate: assignment?.dueDate || ""
  });

  const handlePointsChange = (submissionId, value) => {
    setPoints(prev => ({
      ...prev,
      [submissionId]: value
    }));
  };

  const handleApplyChanges = () => {
    // Here you would implement the logic to save the changes
    console.log('Saving points:', points);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditData({
      description: assignment.description,
      maxPoints: assignment.maxPoints,
      dueDate: assignment.dueDate
    });
  };

  const handleSave = () => {
    console.log('Saving changes:', editData);
    setIsEditing(false);
  };

  const isSubmissionLate = (submissionDate, dueDate) => {
    return new Date(submissionDate) > new Date(dueDate);
  };

  if (!assignment) {
    return (
      <div id="assignment-details">
        <div id="assignments-header">
          <h1>Детайли</h1>
          <p className="smallText">Няма избрано задание</p>
        </div>
        
        <p>За да видите детайлите, трябва да избереш задание.</p>
      </div>  
    );
  }

  return (
    <div id="assignment-details">
      <div id="assignments-header">
        <div className="header-content">
          <h1>Детайли</h1>
          <p className='smallText'>{assignment.title}</p>
          {role === "учител" && !isEditing && (
            <Button 
              content="Редактирай"
              onClick={handleEdit}
            />
          )}
        </div>
      </div>

      {role === "учител" && isEditing ? (
        <>
          <div className="edit-field-group">
            <label className="edit-field-label">Описание</label>
            <textarea
              value={editData.description}
              onChange={(e) => setEditData({...editData, description: e.target.value})}
              placeholder="Въведете описание на заданието"
              className="edit-field"
            />
          </div>
          <div className="edit-row">
            <div className="edit-field-group">
              <label className="edit-field-label">Краен срок</label>
              <input
                type="datetime-local"
                value={editData.dueDate}
                onChange={(e) => setEditData({...editData, dueDate: e.target.value})}
                className="edit-field"
              />
            </div>
            <div className="edit-field-group">
              <label className="edit-field-label">Максимални точки</label>
              <input
                type="number"
                value={editData.maxPoints}
                onChange={(e) => setEditData({...editData, maxPoints: e.target.value})}
                className="edit-field"
                min="0"
              />
            </div>
          </div>
          <div className="edit-actions">
            <Button 
              content="Прикачи файлове"
              onClick={() => console.log('Attach files')}
            />
            <Button 
              content="Запази"
              onClick={handleSave}
            />
          </div>
        </>
      ) : (
        <>
          <p>{assignment.description || "Няма описание"}</p>
          <div className="horizontal-line"></div>
          <div id="assignmentResult">
            <p>Краен срок: <span className={`info-box ${getDueDateClass(assignment.dueDate)}`}>
              {formatDueDate(assignment.dueDate)}
            </span></p>
            <p>Точки: <span className={`info-box ${role !== "учител" ? getPointsClass(assignment.userPoints, assignment.maxPoints) : ''}`}>
              {role === "учител" ? 
                `Максимум: ${assignment.maxPoints}` : 
                `${assignment.userPoints || "~"}/${assignment.maxPoints}`}
            </span></p>
          </div>
        </>
      )}

      {role !== "учител" && (
        <div id="myWork">
          <div className="submission-actions">
            <Button 
              content="Прикачи файл"
              onClick={() => console.log('Attach file')}
            />
            <Button 
              content="Предай работа"
              onClick={() => console.log('Submit work')}
            />
          </div>
        </div>
      )}

      {role === "учител" && assignment?.submissions?.length > 0 && (
        <div id="submissions">
          <div className="submissions-header">
            <h2>Предадени работи</h2>
            <Button 
              content="Запази промените"
              onClick={handleApplyChanges}
            />
          </div>
          <div className="submissions-list">
            {assignment.submissions.map((submission) => (
              <div key={submission.id} className="submission-item">
                <div className="submission-header">
                  <div className="submission-top">
                    <h3>{submission.studentName}</h3>
                    <div className="points-input">
                      <input 
                        type="number" 
                        placeholder="Точки"
                        min="0"
                        max={assignment.maxPoints}
                        defaultValue={submission.points}
                        onChange={(e) => handlePointsChange(submission.id, e.target.value)}
                      />
                      /{assignment.maxPoints}
                    </div>
                  </div>
                  <div className="submission-meta">
                    <span>Предадено на: {submission.submittedDate}</span>
                    <span className={`submission-status ${isSubmissionLate(submission.submittedDate, assignment.dueDate) ? 'status-late' : 'status-ontime'}`}>
                      {isSubmissionLate(submission.submittedDate, assignment.dueDate) ? 'Закъсняло' : 'Навреме'}
                    </span>
                  </div>
                </div>
                {submission.files && submission.files.length > 0 ? (
                  <div className="attached-files">
                    {submission.files.map((file, index) => (
                      <div key={index} className="file-item">
                        <span>{file.name}</span>
                        <Button content="Изтегли" onClick={() => window.open(file.url)} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="no-files">Няма прикачени файлове</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default AssignmentDetails;