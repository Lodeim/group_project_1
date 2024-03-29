import { useEffect } from "react";
import { Bars } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import MainPage from "../../pages/MainPage";
import NoAccessPage from "../../pages/NoAccessPage/index";
import UserPage from "../../pages/UserPage";
import UsersCards from "../../pages/UsersCards";
import { getAuthorizedUser } from "../../redux/actions/users";

import "./styles.css";
import NotFoundPage from "../../pages/NotFoundPage";

const authorizedRoutes = [
  { path: "/", element: <MainPage />, exact: true },
  { path: "/:_id", element: <UserPage /> },
  { path: "/users", element: <UsersCards /> },
  { path: "*", element: <NotFoundPage/>}
];

const PageRoutes = () => {
  const authorizedUser = useSelector((state) => state.users.authorizedUser);
  const isLoading = useSelector((state) => state.users.isAuthorizedUserLoading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAuthorizedUser());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return (
      <div className="cnPageRoutesLoader">
        <Bars color="#5f9ea0" width={80} height={80} />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        {authorizedUser ? (
          authorizedRoutes.map((route) => <Route {...route} key={route.path} />)
        ) : (
          <Route path="*" element={<NoAccessPage />} exact />
        )}
      </Routes>
    </BrowserRouter>
  );
};
export default PageRoutes;
