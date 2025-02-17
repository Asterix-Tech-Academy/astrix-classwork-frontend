import React from "react";
import Button from "../Button/Button";
import "./Grades.css";

function Grades({ selectedClassroom }) {
  return (
    <div id="grades">
      <div id="grades-header" className="horizontal-layout">
        <h1>Оценки</h1>
        <p className="smallText">
          {selectedClassroom?.title || "Няма избрана класна стая"}
        </p>
      </div>

      {!selectedClassroom?.grades ? (
        <p className="noGrades">Няма нанесени оценки за тази класна стая.</p>
      ) : (
        <div id="grades-list">
          {selectedClassroom.grades.map((gradeObject) => {
            const { id, grade } = gradeObject;
            let longName;
            let color;
            const onDate = gradeObject.onDate;
            const teacher = gradeObject.teacher;

            switch (grade) {
              case 2:
                longName = "Слаб";
                color = "red";
                break;
              case 3:
                longName = "Среден";
                color = "orange";
                break;
              case 4:
                longName = "Добър";
                color = "yellow";
                break;
              case 5:
                longName = "Мн. Добър";
                color = "blue";
                break;
              case 6:
                longName = "Отличен";
                color = "green";
                break;
              default:
                longName = "Неизвестен";
                color = "gray";
            }

            return (
              <Button
                key={id}
                content={
                  <div className="grade">
                    <span>{longName}</span>
                    <div id="gradeValue" className={color}>
                      {grade}
                    </div>
                    <div id="otherInfo">
                    {onDate || "~"} 
                    <span className="teacher">{teacher}</span>
                  </div>

                  </div>
                }
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Grades;
