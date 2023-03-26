import React from 'react';
import UserBadge from "../UserBadge";
import AddPostModal from "../AddModal/index";

import "./styles.css";


const Navbar = ({ userName, avatarUrl, id }) => {
  return (
    <div className="cnNavbarRoot">
      <div className="cnNavbarWrapper">
        <a href="/" className="cnNavbarLink">
          Photo & Post
        </a>
        <UserBadge userName={userName} avatarUrl={avatarUrl} id={id} />
        <AddPostModal />
      </div>
    </div >
  );
};
export default Navbar;


