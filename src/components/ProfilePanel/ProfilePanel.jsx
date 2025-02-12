import './ProfilePanel.css';
import profilePicture from '../../../public/profile.png';

function ProfilePanel() {
  const name = "Преслав Колев";
  const type = "ученик";
  const pic = profilePicture;
  
  return (
    <div id="profile" className="panel">
      <div id='profile-panel-left'>
        <img src={profilePicture} alt={name + "'s profile"} />
        <p>{name}</p>
      </div>
      <div id='profile-panel-right'>
        <p>{type}</p>
      </div>
    </div>
  );
}

export default ProfilePanel;