import { useState, useEffect } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";  // Agar aap navigate karna chahte hain, toh isse enable karein.

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [profile, setProfile] = useState(null);
  const [mode, setMode] = useState("login");



 const backendURL = "https://hackathon-backend-cqqf.vercel.app";


  function register(e) {
    e.preventDefault();
    axios
      .post(`${backendURL}/register`, { name, email, password })
      .then(() => {
        alert("Registered!");
        setMode("login");
        setName("");
        setEmail("");
        setPassword("");
      })
      .catch(err => {
        console.error("Register error:", err);
        alert(err.response?.data?.error || "Registration failed");
      });
  }

  function login(e) {
    e.preventDefault();
    axios
      .post(`${backendURL}/login`, { email, password })
      .then(res => {
        localStorage.setItem("token", res.data.token);
        setToken(res.data.token);
        setEmail("");
        setPassword("");
        // agar navigate karna ho to:
        // navigate("/profile-form");
      })
      .catch(err => {
        console.error("Login error:", err);
        alert(err.response?.data?.error || "Invalid credentials");
      });
  }

  function getProfile() {
    axios
      .get(`${backendURL}/profile`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setProfile(res.data))
      .catch(err => console.error("Profile fetch error:", err));
  }

  function logout() {
    localStorage.removeItem("token");
    setToken("");
    setProfile(null);
  }

  useEffect(() => {
    if (token) getProfile();
  }, [token]);

  return (
    <div className="app-container">
      <div className="card">
        {!token ? (
          <>
            <h2>{mode === "login" ? "Login" : "Register"}</h2>
            <form onSubmit={mode === "login" ? login : register}>
              {mode === "register" && (
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                />
              )}
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
              <button type="submit">
                {mode === "login" ? "Login" : "Register"}
              </button>
            </form>
            <p>
              {mode === "login" ? (
                <>
                  Don't have an account?{" "}
                  <span className="link" onClick={() => setMode("register")}>
                    Register
                  </span>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <span className="link" onClick={() => setMode("login")}>
                    Login
                  </span>
                </>
              )}
            </p>
          </>
        ) : (
          <>
            <h2>Welcome, {profile?.name}</h2>
            <p>{profile?.email}</p>
            <button className="logout" onClick={logout}>
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}
