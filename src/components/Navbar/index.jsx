import React from 'react';
import UserBadge from "../UserBadge";

import "./styles.css";
// import { UserAddPost } from '../UserAddPost';
import { useState } from 'react';
import Button from '../Button';
import { UserActionModal } from '../UserActionModal';

const Navbar = ({ userName, avatarUrl, _id }) => {


  const [isUserActionModalVisible, setIsUserActionModalVisible] = useState(false);
  const onCloseUserActionModal = (e) => {
    e.stopPropagation();
    setIsUserActionModalVisible(false);
  };
  const onOpenUserActionModal = () => {
    setIsUserActionModalVisible(true);
  };


  return (
    <div className="cnNavbarRoot">
      <div className="cnNavbarWrapper">
        <a href="/" className="cnNavbarLink">
          Photo & Post
        </a>
        <div className='cnNavbarControlsWrapper'>
        <UserBadge userName={userName} avatarUrl={avatarUrl} _id={_id} />

         <Button onClick={onOpenUserActionModal}>чтотосделать</Button>
        <UserActionModal
            isOpen={isUserActionModalVisible}
            onClose={onCloseUserActionModal}
            user={userName}
            />
          
        </div>
      
      
      </div>
    </div >
  );
};
export default Navbar;


