import './Button.css';

function Button({ content, active, onClick }) { // Add active and onClick props
  return (
    <button
      className={`button ${active ? 'active' : ''}`}
      onClick={onClick}
    >
      {content}
    </button>
  );
}

export default Button;