import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./components/homepage/HomePage";
import SignUp from "./components/userauth/SignUp";
import LogIn from "./components/userauth/LogIn";
import UserProfile from "./components/userprofile/UserProfile";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
