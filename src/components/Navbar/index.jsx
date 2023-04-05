import React from 'react';
import UserBadge from "../UserBadge";

import "./styles.css";
// import { UserAddPost } from '../UserAddPost';
import { useState } from 'react';
import Button from '../Button';
import { UserActionModal } from '../UserActionModal';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = ({ userName, avatarUrl, _id }) => {
  const navigateUsers = useNavigate();



  const [isUserActionModalVisible, setIsUserActionModalVisible] = useState(false);
  const authorizedUser = useSelector((state) => state.users.authorizedUser);
  const onCloseUserActionModal = (e) => {
    e.stopPropagation();
    setIsUserActionModalVisible(false);
  };
  const onOpenUserActionModal = () => {
    setIsUserActionModalVisible(true);
  };

  const onUsersCardsClick = () => {
    navigateUsers(`/users`);
  };
  return (
    <div className="cnNavbarRoot">
      <div className="cnNavbarWrapper">
        <a href="/" className="cnNavbarLink">
          Photo & Post
        </a>
        <div className='cnNavbarControlsWrapper'>
        <UserBadge userName={authorizedUser? authorizedUser.name: 'Авторизуйтесь'} avatarUrl={authorizedUser? authorizedUser.avatar: avatarUrl} _id={authorizedUser? authorizedUser._id : _id} />

        <Button onClick={onUsersCardsClick}>Пользователи</Button> 


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


