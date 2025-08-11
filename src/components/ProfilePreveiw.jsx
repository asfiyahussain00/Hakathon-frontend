import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ProfileForm({ token }) {
  const [profile, setProfile] = useState({
    name: "",
    skills: "",
    github: "",
  });

  const backendURL = import.meta.env.VITE_BACKEND_URL; // your hosted backend URL
  const navigate = useNavigate();

  // Fetch existing profile when token or backendURL changes
  useEffect(() => {
    if (!token) return;
    axios
      .get(`${backendURL}/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setProfile(res.data);
      })
      .catch(() => {
        // fail silently or show error
      });
  }, [token, backendURL]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${backendURL}/profile`, profile, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Profile saved successfully!");
      navigate("/home");
    } catch (err) {
      alert(err.response?.data?.error || "Error saving profile");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={profile.name}
        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
        placeholder="Name"
        required
      />
      <input
        type="text"
        value={profile.skills}
        onChange={(e) => setProfile({ ...profile, skills: e.target.value })}
        placeholder="Skills (comma separated)"
        required
      />
      <input
        type="text"
        value={profile.github}
        onChange={(e) => setProfile({ ...profile, github: e.target.value })}
        placeholder="GitHub Link"
        required
      />
      <button type="submit">Save</button>
    </form>
  );
}
