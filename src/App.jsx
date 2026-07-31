import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Body from "./components/Body.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import Profile from "./components/Profile.jsx";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./components/Feed.jsx";
import Connection from "./components/Connection.jsx";
import Request from "./components/Request.jsx";

function App() {
  return (
    <>
      <Provider store={appStore}>
        <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Feed />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/connections" element={<Connection />} />
              <Route path="/requests" element={<Request />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
