import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ProfileForm({ token }) {
  const [profile, setProfile] = useState({ name: "", skills: "", github: "", projects: [] });
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3000/profile", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setProfile(res.data))
    .catch(err => console.error(err));
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/profile", profile, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Profile saved successfully!");
      navigate("/home"); // ✅ Save ke baad redirect
    } catch (error) {
      alert(error.response?.data?.error || "Error saving profile");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={profile.name}
        onChange={e => setProfile({ ...profile, name: e.target.value })}
        placeholder="Name"
      />
      <input
        value={profile.skills}
        onChange={e => setProfile({ ...profile, skills: e.target.value })}
        placeholder="Skills (comma separated)"
      />
      <input
        value={profile.github}
        onChange={e => setProfile({ ...profile, github: e.target.value })}
        placeholder="GitHub Link"
      />
      <button type="submit">Save</button>
    </form>
  );
}
