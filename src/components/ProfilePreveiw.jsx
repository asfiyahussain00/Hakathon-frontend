import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ProfileForm({ token }) {
  const [profile, setProfile] = useState({
    name: "",
    skills: "",
    github: "",
    projects: []
  });
  const navigate = useNavigate();

  // Fetch existing profile (agar pehle se saved ho)
  useEffect(() => {
    axios.get("http://localhost:3000/profile/me", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setProfile(res.data))
    .catch(() => {});
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/profile", profile, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Profile saved successfully!");
      navigate("/home"); // ✅ Save ke baad home par bhej rahe
    } catch (err) {
      alert(err.response?.data?.error || "Error saving profile");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={profile.name}
        onChange={e => setProfile({ ...profile, name: e.target.value })}
        placeholder="Name"
        required
      />
      <input
        value={profile.skills}
        onChange={e => setProfile({ ...profile, skills: e.target.value })}
        placeholder="Skills (comma separated)"
        required
      />
      <input
        value={profile.github}
        onChange={e => setProfile({ ...profile, github: e.target.value })}
        placeholder="GitHub Link"
        required
      />
      <button type="submit">Save</button>
    </form>
  );
}
