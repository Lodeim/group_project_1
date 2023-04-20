import React from "react";
import UserBadge from "../UserBadge";
import { UserAddPost } from "../UserAddPost";
import { useState } from "react";
import { UserActionModal } from "../UserActionModal";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import "./styles.css";

const Navbar = ({ userName, avatarUrl, _id }) => {
  const navigateUsers = useNavigate();

  const [isUserActionModalVisible, setIsUserActionModalVisible] =
    useState(false);
  const authorizedUser = useSelector((state) => state.users.authorizedUser);
  const onCloseUserActionModal = (e) => {
    e.stopPropagation();
    setIsUserActionModalVisible(false);
  };
  const onOpenUserActionModal = () => {
    setIsUserActionModalVisible(true);
  };

  const [isAddPostVisible, setIsAddPostVisible] = useState(false);
  const onCloseAddPost = (e) => {
    e.stopPropagation();
    setIsAddPostVisible(false);
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
        <div className="cnNavbarControlsWrapper">
          <UserBadge
            userName={authorizedUser ? authorizedUser.name : ""}
            avatarUrl={authorizedUser ? authorizedUser.avatar : avatarUrl}
            _id={authorizedUser ? authorizedUser._id : _id}
          />
          {authorizedUser ? (
            <>
              <i
                className="fa-solid fa-gear cnActivateBtn"
                onClick={onOpenUserActionModal}
                alt="Меню пользователя"
                title="Меню пользователя"
              ></i>
              <i
                className="fa-regular fa-address-card cnActivateBtn"
                onClick={onUsersCardsClick}
                alt="Все пользователи"
                title="Все пользователи"
              ></i>
              <UserActionModal
                isOpen={isUserActionModalVisible}
                onClose={onCloseUserActionModal}
                user={userName}
              />
              <UserAddPost isOpen={isAddPostVisible} onClose={onCloseAddPost} />
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};
export default Navbar;
