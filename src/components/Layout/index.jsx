import Footer from "../Footer";
import Navbar from "../Navbar";

import "./styles.css";

const Layout = ({ userName, avatarUrl, id, children }) => {
  return (
    <div className="cnLayoutRoot">
      <Navbar userName={userName} avatarUrl={avatarUrl} id={id} />
      <div className="cnLayoutBody">{children}</div>
      <Footer></Footer>
    </div>
  );
};

export default Layout;
