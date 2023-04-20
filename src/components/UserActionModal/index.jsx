import Modal from "react-modal";
import React, { useState } from "react";
import { AuthModal } from "../AuthModal";
import { SignupModal } from "../SignupModal";
import { UserAddPost } from "../UserAddPost";
import { useNavigate } from "react-router-dom";
import Button from "../Button";
import Cookies from "js-cookie";
import { ThemeProvider } from "@mui/material";
import { theme } from "../../theme";

import "./styles.css";

export const UserActionModal = ({ isOpen, onClose, user }) => {
  const navigateUsers = useNavigate();
  const onUsersCardsClick = () => {
    navigateUsers(`/users`);
  };
  const [isAddPostVisible, setIsAddPostVisible] = useState(false);
  const onCloseAddPost = (e) => {
    e.stopPropagation();
    setIsAddPostVisible(false);
  };
  const onOpenAddPost = () => {
    setIsAddPostVisible(true);
  };

  const [isAuthModalVisible, setIsAuthModalVisible] = useState(false);
  const onCloseAuthModal = (e) => {
    e.stopPropagation();
    setIsAuthModalVisible(false);
  };
  const onOpenAuthModal = () => {
    setIsAuthModalVisible(true);
  };
  const [isSignupModalVisible, setIsSignupModalVisible] = useState(false);
  const onCloseSignupModal = (e) => {
    e.stopPropagation();
    setIsSignupModalVisible(false);
  };
  const onOpenSignupModal = () => {
    setIsSignupModalVisible(true);
  };
  const authCookie = Cookies.get("auth");
  if (authCookie === undefined) {
    return (
      <ThemeProvider theme={theme}>
        <Modal
          isOpen={isOpen}
          onRequestClose={onClose}
          ariaHideApp={false}
          className="cnUserActionModal"
          overlayClassName="cnUserActionModalOverlay"
        >
          <Button onClick={onOpenAuthModal} variant="contained">
            Авторизоваться
          </Button>
          <AuthModal isOpen={isAuthModalVisible} onClose={onCloseAuthModal} />
          <Button onClick={onOpenSignupModal} variant="contained">
            Зарегистрироваться
          </Button>
          <SignupModal
            isOpen={isSignupModalVisible}
            onClose={onCloseSignupModal}
          />
        </Modal>
      </ThemeProvider>
    );
  } else if (user) {
    return (
      <ThemeProvider theme={theme}>
        <Modal
          isOpen={isOpen}
          onRequestClose={onClose}
          ariaHideApp={false}
          className="cnUserActionModal"
          overlayClassName="cnUserActionModalOverlay"
        >
          <div className="cnUserActionModalText">
            <div>{`Привет, ${user}!`}</div>
            <div>Что вы хотите сделать?</div>
          </div>
          <button className="cnUserActionBtnLink" onClick={onOpenAddPost}>
            Добавить пост
          </button>
          <button className="cnUserActionBtnLink" onClick={onUsersCardsClick}>
            Посмотреть страницу пользователей
          </button>
          <button
            className="cnUserActionBtnLink"
            onClick={() => {
              Cookies.remove("auth");
              window.location.reload();
            }}
          >
            <i class="fa-solid fa-right-from-bracket"></i> Выйти
          </button>
          <UserAddPost isOpen={isAddPostVisible} onClose={onCloseAddPost} />
        </Modal>
      </ThemeProvider>
    );
  }
};
