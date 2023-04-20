import Navbar from "../../components/Navbar";
import { Gradient } from "../../components/Gradient";
import { useEffect, useState } from "react";
import Button from "../../components/Button";
import { AuthModal } from "../../components/AuthModal";
import { SignupModal } from "../../components/SignupModal";

import "./styles.css";

const NoAccessPage = () => {
  const canvas = document.querySelector("canvas");
  useEffect(() => {
    const gradient = new Gradient();
    gradient.initGradient("#gradient-canvas");
  }, [canvas]);
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
  return (
    <div className="cnNoAccsessPageWrapper">
      <Navbar></Navbar>
      <div className="cnGradientWrapper">
        <canvas id="gradient-canvas" data-transition-in />
        <div className="cnNoAccButtonsWrapper">
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
        </div>
      </div>
    </div>
  );
};

export default NoAccessPage;
