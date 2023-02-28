import { Provider } from "react-redux";
import { store } from "./redux/store";
import PageRoutes from "./components/PageRoutes";

const App = () => {
  return (
    <Provider store={store}>
      <PageRoutes />
    </Provider>
  );
};

export default App;
