import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Body from "./Body.jsx";
import Login from "./Login.jsx";
import Profile from "./Profile.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
