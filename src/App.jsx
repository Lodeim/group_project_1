import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import { store } from "./redux/store";
import UserPage from "./UserPage";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/:id" element={<UserPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
