import Navbar from "../../components/Navbar";
import { Gradient } from "../../components/Gradient";
import { useEffect, useState } from "react";
import Button from "../../components/Button";
import { AuthModal } from "../../components/AuthModal";
import { SignupModal } from "../../components/SignupModal";

import "./styles.css";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const canvas = document.querySelector("canvas");
  useEffect(() => {
    const gradient = new Gradient();
    gradient.initGradient("#gradient-canvas");
  }, [canvas]);

  const navigateMain = useNavigate()
  const onMainClick = () => {
    navigateMain(`/`);
  };

  return (
    <div className="cnNoAccsessPageWrapper">
      <Navbar></Navbar>
      <div className="cnGradientWrapper">
        <canvas id="gradient-canvas" data-transition-in />
        <div className="cnNoAccButtonsWrapper">
          <p>Такую страницу мы еще не сделали...</p>
          <Button 
          onClick={onMainClick}
          variant="contained">
            На главную
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
