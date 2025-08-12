import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ProfileForm({ token }) {
  const [profile, setProfile] = useState({ name: "", skills: "", github: "", projects: [] });
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("https://hackathon-backend-cqqf.vercel.app/profile", {
      headers: { Authorization: `Bearer ${token}` }  // fixed template literal here
    })
    .then(res => setProfile(res.data))
    .catch(err => console.error(err));
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://hackathon-backend-cqqf.vercel.app/profile", profile, {
        headers: { Authorization: `Bearer ${token}` }  // fixed template literal here
      });
      alert("Profile saved successfully!");
      navigate("/home"); // ✅ Save ke baad redirect
    } catch (error) {
      alert(error.response?.data?.error || "Error saving profile");
    }
  };

  return (
    <>
      <h1>Create Your Profile...</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", maxWidth: 400, gap: 12 }}>
        <input
          value={profile.name}
          onChange={e => setProfile({ ...profile, name: e.target.value })}
          placeholder="Name"
          style={{ padding: "10px", borderRadius: 6, border: "1px solid #ccc" }}
        />
        <input
          value={profile.skills}
          onChange={e => setProfile({ ...profile, skills: e.target.value })}
          placeholder="Skills (comma separated)"
          style={{ padding: "10px", borderRadius: 6, border: "1px solid #ccc" }}
        />
        <input
          value={profile.github}
          onChange={e => setProfile({ ...profile, github: e.target.value })}
          placeholder="GitHub Link"
          style={{ padding: "10px", borderRadius: 6, border: "1px solid #ccc" }}
        />
        <button
          type="submit"
          style={{
            backgroundColor: "#28a745", // green background
            color: "white",             // white text
            padding: "12px",
            border: "none",
            borderRadius: "8px",
            fontWeight: "600",
            cursor: "pointer",
            fontSize: "16px",
            marginTop: "10px"
          }}
        >
          Save
        </button>
      </form>
    </>
  );
}

