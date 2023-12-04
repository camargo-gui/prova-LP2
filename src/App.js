import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { User } from "./user";
import { Message } from "./message";
import { Menu } from "./menu";
import store from "./redux/store";
function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/user" element={<User />} />
            <Route path="/message" element={<Message />} />
            <Route path="/" element={<Menu />} />
            <Route path="/prova-LP2" element={<Menu />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>

  );
}

export default App;
