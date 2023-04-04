import React from 'react';
import UserBadge from "../UserBadge";

import "./styles.css";
import { UserAddPost } from '../UserAddPost';
import { useState } from 'react';
import Button from '../Button';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ userName, avatarUrl, _id }) => {
  const [isAddPostVisible, setIsAddPostVisible]= useState(false);
  const navigateUsers = useNavigate();
 
  const onCloseAddPost = (e) => {
    e.stopPropagation()
    setIsAddPostVisible(false);

  };
  const onOpenAddPost = () => {
    setIsAddPostVisible(true);
   
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
        <UserBadge userName={userName} avatarUrl={avatarUrl} _id={_id} />
        <Button onClick={onOpenAddPost}>Добавить пост</Button>
        <Button onClick={onUsersCardsClick}>Пользователи</Button> 
        <UserAddPost
            isOpen={isAddPostVisible}
            onClose={onCloseAddPost}
            />
        </div>
      
      
      </div>
    </div >
  );
};
export default Navbar;


