import { useState } from "react";
import axios from "axios";
import ProfileForm from "./ProfileForm";  // apne ProfileForm component ko import karein

const backendURL = "https://hackathon-backend-cqqf.vercel.app";

export default function AuthAndProfile() {
  const [mode, setMode] = useState("login"); // login ya register mode
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Register karne ka function
  const register = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${backendURL}/register`, { name, email, password });
      alert("Registered successfully! Please login.");
      setMode("login");
      setName("");
      setEmail("");
      setPassword("");
    } catch (err) {
      alert(err.response?.data?.error || "Registration failed");
    }
  };

  // Login karne ka function
  const login = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${backendURL}/login`, { email, password });
      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);
      setEmail("");
      setPassword("");
    } catch (err) {
      alert(err.response?.data?.error || "Login failed");
    }
  };

  // Logout ka function — yahaan define karo
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
  };

  // Agar token nahi hai to login/register form dikhao
  if (!token) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <h2>{mode === "login" ? "Login" : "Register"}</h2>
          <form onSubmit={mode === "login" ? login : register} style={styles.form}>
            {mode === "register" && (
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={styles.input}
              />
            )}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
            />
            <button type="submit" style={styles.button}>
              {mode === "login" ? "Login" : "Register"}
            </button>
          </form>
          <p style={{ marginTop: 10 }}>
            {mode === "login" ? (
              <>
                Don't have an account?{" "}
                <span style={styles.link} onClick={() => setMode("register")}>
                  Register
                </span>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <span style={styles.link} onClick={() => setMode("login")}>
                  Login
                </span>
              </>
            )}
          </p>
        </div>
      </div>
    );
  }

  // Agar login ho to ProfileForm aur logout button dikhayein
  return (
    <div>
      <nav style={styles.navbar}>
        <h1 style={{ color: "white" }}>Portfolio Builder</h1>
        <button onClick={logout} style={styles.logoutButton}>
          Logout
        </button>
      </nav>
      <ProfileForm token={token} />
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f2f5",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  card: {
    backgroundColor: "white",
    padding: 30,
    borderRadius: 12,
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
    width: 350,
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    marginTop: 20,
  },
  input: {
    marginBottom: 15,
    padding: 12,
    fontSize: 16,
    borderRadius: 8,
    border: "1px solid #ccc",
    outline: "none",
  },
  button: {
    backgroundColor: "#0366d6",
    color: "white",
    padding: 12,
    fontSize: 16,
    borderRadius: 8,
    border: "none",
    cursor: "pointer",
    fontWeight: "700",
  },
  link: {
    color: "#0366d6",
    cursor: "pointer",
    textDecoration: "underline",
    fontWeight: "600",
  },
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#24292e",
    padding: "15px 30px",
  },
  logoutButton: {
    backgroundColor: "#d73a49",
    border: "none",
    padding: "10px 20px",
    borderRadius: "6px",
    color: "white",
    fontWeight: "600",
    cursor: "pointer",
  },
};
