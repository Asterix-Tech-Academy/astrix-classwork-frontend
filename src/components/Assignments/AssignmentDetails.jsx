import Button from "../Button/Button";
import { getRole } from '../profilePanel/ProfilePanel';

function AssignmentDetails({assignment}) {
  const role = getRole();

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
        <h1>Детайли</h1>
        <p className='smallText'>{assignment.title}</p>
      </div>
      <p>{assignment.description || "Няма описание"}</p>
      <div className="horizontal-line"></div>
      <div id="assignmentResult">
        <p>Краен срок: {assignment.dueDate} </p>
        <p>Точки: {assignment.userPoints || "~"}/{assignment.maxPoints}</p>
      </div>
      <div className="horizontal-line"></div>

      {role === "учител" && (
        <div id="submissions">
          <h2>Предадени работи</h2>
          <div className="submissions-list">
            {assignment.submissions?.map((submission) => (
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