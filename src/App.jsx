
import { Routes, Route, Navigate } from "react-router-dom";
import LoginRegister from "./components/Signup";
import Home from "./components/Home";
import ProfileForm from "./components/ProfileForm";
import ProfilePreview from "./components/ProfilePreveiw";  // spelling fixed here
import './App.css';

export default function App() {
  const token = localStorage.getItem("token");

  return (
    <Routes>
      <Route
        path="/"
        element={!token ? <LoginRegister /> : <Navigate to="/profile-form" />}
      />
      <Route
        path="/login"
        element={<LoginRegister />}
      />
      <Route
        path="/home"
        element={token ? <Home /> : <Navigate to="/login" />}
      />
      <Route
        path="/profile-form"
        element={token ? <ProfileForm token={token} /> : <Navigate to="/login" />}
      />
      <Route
        path="/profile-preview"
        element={token ? <ProfilePreview /> : <Navigate to="/login" />}
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
