import Navbar from "../Navbar";

import "./styles.css";

const Layout = ({ userName, avatarUrl, _id, children }) => {
  return (
    <div className="cnLayoutRoot">
      <Navbar userName={userName} avatarUrl={avatarUrl} _id={_id} />
      <div className="cnLayoutBody">{children}</div>
    </div>
  );
};

export default Layout;
