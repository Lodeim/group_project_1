import Modal from "react-modal";
import React, { useState } from "react";
import "./styles.css";
import { AuthModal } from "../AuthModal";
import { SignupModal } from "../SignupModal";
import { UserAddPost } from "../UserAddPost";
import Button from "../Button";
import Cookies from "js-cookie";
import { ThemeProvider } from "@mui/material";
import { theme } from "../../theme";

export const UserActionModal = ({ 
    isOpen, 
    onClose,
    user
}) => {
  const [isAddPostVisible, setIsAddPostVisible]= useState(false)
  const onCloseAddPost = (e) => {
    e.stopPropagation()
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
  const authCookie = Cookies.get('auth')
  if (authCookie === undefined) {
    return (
      <ThemeProvider theme={theme}>

        <Modal 
      isOpen={isOpen} 
      onRequestClose={onClose} 
      ariaHideApp={false}
      className="cnModal"
      overlayClassName="cnModalOverlay"
      >
        <Button onClick={onOpenAuthModal} variant="contained">Авторизоваться</Button>
        <AuthModal 
        isOpen={isAuthModalVisible} 
        onClose={onCloseAuthModal} 
        />
        <Button onClick={onOpenSignupModal} variant="contained">Зарегистрироваться</Button>
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
      className="cnModal"
      overlayClassName="cnModalOverlay"
      >
        <p>{`Привет, ${user}!`}</p>

        <Button onClick={onOpenAddPost}>Добавить пост</Button>
        <Button onClick={() => {
            Cookies.remove('auth')
            window.location.reload()
            }}>Выйти</Button>
        <UserAddPost
            isOpen={isAddPostVisible}
            onClose={onCloseAddPost}
            />
      </Modal>
      </ThemeProvider>

    );
  }
};
