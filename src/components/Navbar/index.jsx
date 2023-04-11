import React from 'react';
import UserBadge from "../UserBadge";

import "./styles.css";
import { UserAddPost } from '../UserAddPost';
import { useState } from 'react';
import Button from '../Button';
import { UserActionModal } from '../UserActionModal';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";

const Navbar = ({ userName, avatarUrl, _id }) => {
  const navigateUsers = useNavigate();



  const [isUserActionModalVisible, setIsUserActionModalVisible] = useState(false);
  const onCloseUserActionModal = (e) => {
    e.stopPropagation();
    setIsUserActionModalVisible(false);
  };
  const onOpenUserActionModal = () => {
    setIsUserActionModalVisible(true);
  };

  const [isAddPostVisible, setIsAddPostVisible]= useState(false)
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

  const authCookie = Cookies.get('auth')

  const userMenu = () => {
    if (authCookie === undefined) {
      return (
      <i class="far fa-user cnUsersIcon cnUsersIconUser" onClick={onOpenUserActionModal} alt="Войти" title="Войти"></i>
      );
    }
    else {
      return (
        <div>
        <i class="fa-solid fa-gear cnUsersIcon" onClick={onOpenUserActionModal} alt="Меню пользователя" title="Меню пользователя"></i>
        <i class="fa-solid fa-user-group cnUsersIcon" onClick={onUsersCardsClick}  alt="Все пользователи" title="Все пользователи"></i>
        </div>
      );
    }
  }

  const AddPostBtn = () => {
    if (authCookie === undefined) {
      return ("");
    }
    else {
      return (
        <Button alt="Добавить пост" title="Добавить пост" className="cnAddPostNavBtn" onClick={onOpenAddPost}><i class="fa-solid fa-plus fa-lg" ></i></Button>
      );
    }
  }

  return (
    <div className="cnNavbarRoot">
      <div className="cnNavbarWrapper">
        <a href="/" className="cnNavbarLink">
          Photo & Post
        </a>
        <div className="cnAddPostBtnWrapper">{AddPostBtn()}</div>
        <div className='cnNavbarControlsWrapper'>
        <UserBadge userName={userName} avatarUrl={avatarUrl} _id={_id} /> 
        <>{userMenu()}</>
        <UserAddPost
            isOpen={isAddPostVisible}
            onClose={onCloseAddPost}
            />
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


