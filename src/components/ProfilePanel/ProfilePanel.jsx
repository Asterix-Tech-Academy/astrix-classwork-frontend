import { useState, useEffect } from 'react';
import './ProfilePanel.css';
import defaultProfilePicture from '../../../public/profile.png';

function ProfilePanel() {
  const [userData, setUserData] = useState({
    name: "",
    role: "",
    profilePicture: defaultProfilePicture
  });
  
  useEffect(() => {
    const userString = localStorage.getItem('user');
    if (userString) {
      try {
        const user = JSON.parse(userString);
        setUserData({
          name: user.name || user.username || "Потребител",
          role: getRoleName(user.role),
          profilePicture: user.profilePicture || defaultProfilePicture
        });
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);
  
  return (
    <div id="profile" className="panel">
      <div id='profile-panel-left'>
        <img src={userData.profilePicture} alt={userData.name + "'s profile"} />
        <p>{userData.name}</p>
      </div>
      <div id='profile-panel-right'>
        <p>{userData.role}</p>
      </div>
    </div>
  );
}

export function getRoleName(role) {
  switch (role) {
    case 'teacher':
      return "учител";
    case 'admin':
      return "администратор";
    case 'student':
      return "ученик";
    default:
      return "ученик";
  }
}

export default ProfilePanel;