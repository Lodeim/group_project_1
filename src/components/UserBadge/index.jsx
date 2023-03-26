import { useNavigate } from "react-router-dom";

import "./styles.css";

const UserBadge = ({ userName, avatarUrl, _id, aboutUser }) => {
  const navigate = useNavigate();
  const onUserBadgeClick = () => {
    navigate(`/${_id}`);
  };
  return (
    <div className="cnUserBadgeRoot" onClick={onUserBadgeClick}>
      {avatarUrl ? (
        <img src={avatarUrl} alt="logo" className="cnUserBadgeAvatar" />
      ) : (
        <div className="cnUserBadgePlaceholder" />
      )}
      <div className="cnUserInfoAbout">
        <span className="cnUserBadgeName">{userName}</span>
        <span className="cnAboutUser">{aboutUser}</span>
      </div>
    </div>
  );
};

export default UserBadge;
