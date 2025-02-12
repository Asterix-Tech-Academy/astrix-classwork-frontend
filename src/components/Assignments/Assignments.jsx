import Button from '../Button/Button';
import './Assignments.css';

function Assignments({ selectedClassroom }) {
  return (
    <div id="assignments">
      <div id="assignments-header">
        <h1>Задания</h1>
        <p className='smallText'>{selectedClassroom}</p>
      </div>

      <br />
      <br />
      <div id="not-submitted">
        <h2>Непредадени</h2>

        <div className='horizontal-layout'>
          <div className="vertical-line"></div>
          <div className='assignments-list'>
            <Button content='Домашна работа - 11.02' active={true} />
            <Button content='Есе на тема “Как научих английск...' />
            <Button content='Презентация на тема “Какво иск...' />
            <Button content='Друго' />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Assignments;