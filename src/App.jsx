
import { Routes, Route, Navigate } from "react-router-dom";
import LoginRegister from "./components/Signup";
import Home from "./components/Home";
import ProfileForm from "./components/ProfileForm";
import ProfilePreview from "./components/ProfilePreveiw";  // spelling fixed here
import './App.css';

export default function App() {
  const token = localStorage.getItem("token");

  // Agar user login nahi to login/register pe bhejo
  // Agar login hai to direct profile-form ya home pe bhejo

  return (
    <Routes>
      {/* Public routes */}
      <Route
        path="/login"
        element={!token ? <LoginRegister /> : <Navigate to="/profile-form" replace />}
      />
      <Route
        path="/"
        element={!token ? <Navigate to="/login" replace /> : <Navigate to="/home" replace />}
      />

      {/* Protected routes */}
      <Route
        path="/home"
        element={token ? <Home /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/profile-form"
        element={token ? <ProfileForm token={token} /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/profile-preview"
        element={token ? <ProfilePreview /> : <Navigate to="/login" replace />}
      />

      {/* Agar koi unknown route ho to */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
