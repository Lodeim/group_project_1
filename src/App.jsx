import { BrowserRouter, Routes, Route } from "react-router-dom"
import MainPage from "./MainPage";
import UserPage from "./UserPage";

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/:id" element={<UserPage />} />
    </Routes>
    </BrowserRouter>
  )
};

export default App;