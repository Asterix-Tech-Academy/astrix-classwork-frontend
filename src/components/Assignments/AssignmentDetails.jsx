import Button from "../Button/Button";

function AssignmentDetails({assignment}) {

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
      <div id="myWork">
        <h2>Моята работа</h2>
        <p className="smallText">Няма прикачена работа</p>
        <Button content={ <div> Прикачи <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12"><path fill="currentColor" d="M8.977 2.806a1.69 1.69 0 0 0-2.304.082L3.28 6.28a.75.75 0 1 1-1.06-1.06l3.392-3.392a3.192 3.192 0 1 1 4.458 4.569l-4.724 4.496A1.923 1.923 0 0 1 2.66 8.14l4.243-4.244a.75.75 0 1 1 1.06 1.061l-4.24 4.244a.423.423 0 0 0 .59.605L9.035 5.31a1.69 1.69 0 0 0-.058-2.504"/></svg> </div> }/>
      </div>
    </div>
  );
}

export default AssignmentDetails;