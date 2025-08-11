import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ 
    name: "", 
    phone: "", 
    email: "", 
    password: "" 
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const backendURL = "https://hackathon-backend-cqqf.vercel.app/";

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (mode === "register") {
        await axios.post(`${backendURL}/register`, form);
        alert("Registration successful! Please login.");
        setMode("login");
      } else {
        const res = await axios.post(`${backendURL}/login`, {
          email: form.email, 
          password: form.password
        });
        localStorage.setItem("token", res.data.token);
        navigate("/profile-form"); // Redirect after login
      }
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
        <h2>{mode === "login" ? "Login" : "Register"}</h2>
        
        {error && <p style={{color: 'red'}}>{error}</p>}
        
        <form onSubmit={submit}>
          {mode === "register" && (
            <>
              <input
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                required
              />
              <input
                name="phone"
                placeholder="Phone"
                value={form.phone}
                onChange={handleChange}
                required
              />
            </>
          )}
          
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            minLength="6"
          />
          
          <button 
            type="submit" 
            disabled={loading}
          >
            {loading ? "Processing..." : mode === "login" ? "Login" : "Register"}
          </button>
        </form>
        
        <p 
          onClick={() => setMode(mode === "login" ? "register" : "login")}
          style={{cursor: 'pointer', color: 'blue', marginTop: '10px'}}
        >
          {mode === "login" ? "Create account" : "Already have account? Login"}
        </p>
      </div>
    </div>
  );
}
