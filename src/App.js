import { Provider } from "react-redux";
import TodoList from "./Pages/TodoList";
import { store } from "./Redux/Store";

const App = () => {
  return (
    <Provider store={store}>
      <TodoList />
    </Provider>
  );
};

export default App;
