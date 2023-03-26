import UserBadge from "../UserBadge";

import "./styles.css";

const Navbar = ({ userName, avatarUrl, _id }) => {
  return (
    <div className="cnNavbarRoot">
      <div className="cnNavbarWrapper">
        <a href="/" className="cnNavbarLink">
          Rugram
        </a>
        <UserBadge userName={userName} avatarUrl={avatarUrl} _id={_id} />
      </div>
    </div>
  );
};
export default Navbar;
