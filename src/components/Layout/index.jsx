import { useEffect } from "react";
import Footer from "../Footer";
import Navbar from "../Navbar";
import { Gradient } from "../Gradient";

import "./styles.css";

const Layout = ({ userName, avatarUrl, _id, children }) => {
  const canvas = document.querySelector("canvas");
  useEffect(() => {
    const gradient = new Gradient();
    gradient.initGradient("#gradient-canvas");
  }, [canvas]);
  return (
    <>
      <div className="cnLayoutRoot">
        <Navbar userName={userName} avatarUrl={avatarUrl} _id={_id} />
        <div className="cnLayoutGradientWrapper">
          <canvas id="gradient-canvas" data-transition-in />
        </div>
        <div className="cnLayoutBody">{children}</div>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
