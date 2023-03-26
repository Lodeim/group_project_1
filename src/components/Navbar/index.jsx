import React from 'react';
import UserBadge from "../UserBadge";
import AddPostModal from "../AddModal/index";

import "./styles.css";

const Navbar = ({ userName, avatarUrl, _id }) => {
  return (
    <div className="cnNavbarRoot">
      <div className="cnNavbarWrapper">
        <a href="/" className="cnNavbarLink">
          Photo & Post
        </a>
        <AddPostModal />
        <UserBadge userName={userName} avatarUrl={avatarUrl} _id={_id} />
      </div>
    </div >
  );
};
export default Navbar;


