import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    skills: "",
    github: "",
    projects: []
  });
  const [newProject, setNewProject] = useState({ title: "", description: "", link: "" });
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const fetchProfile = () => {
    if (!token) return;
    axios
      .get("http://localhost:3000/profile", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => {
        setProfile({
          ...res.data,
          skills: res.data.skills?.join(", ") || ""
        });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleProjectChange = (e) => {
    setNewProject({ ...newProject, [e.target.name]: e.target.value });
  };

  const saveProfile = () => {
    axios
      .post("http://localhost:3000/profile", profile, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(() => {
        fetchProfile();
        alert("Profile saved & updated!");
      })
      .catch((err) => alert(err.response?.data?.error || "Error saving profile"));
  };

  const addProject = () => {
    if (!newProject.title) return alert("Project title is required");
    const updatedProjects = [...profile.projects, newProject];
    setProfile({ ...profile, projects: updatedProjects });
    setNewProject({ title: "", description: "", link: "" });
  };

  const deleteProject = (index) => {
    const updatedProjects = profile.projects.filter((_, i) => i !== index);
    setProfile({ ...profile, projects: updatedProjects });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;

  return (
    <div style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#f5f6fa", minHeight: "100vh" }}>
      {/* Navbar */}
      <nav style={{ backgroundColor: "#2c3e50", color: "white", padding: "10px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ margin: 0 }}>Portfolio Builder</h2>
        <button onClick={handleLogout} style={{ background: "#e74c3c", color: "white", border: "none", padding: "8px 16px", borderRadius: "5px", cursor: "pointer" }}>
          Logout
        </button>
      </nav>

      <div style={{ display: "flex", gap: "20px", padding: "20px" }}>
        {/* Form Section */}
        <div style={{ flex: 1, background: "white", padding: "20px", borderRadius: "10px", boxShadow: "0px 2px 8px rgba(0,0,0,0.1)" }}>
          <h3>Edit Profile</h3>
          <input type="text" name="name" placeholder="Your Name" value={profile.name} onChange={handleChange} style={inputStyle} />
          <input type="email" name="email" placeholder="Your Email" value={profile.email} onChange={handleChange} style={inputStyle} />
          <input type="text" name="skills" placeholder="Skills (comma separated)" value={profile.skills} onChange={handleChange} style={inputStyle} />
          <input type="text" name="github" placeholder="GitHub Link" value={profile.github} onChange={handleChange} style={inputStyle} />

          <h4>Add Project</h4>
          <input type="text" name="title" placeholder="Project Title" value={newProject.title} onChange={handleProjectChange} style={inputStyle} />
          <input type="text" name="description" placeholder="Project Description" value={newProject.description} onChange={handleProjectChange} style={inputStyle} />
          <input type="text" name="link" placeholder="Project Link" value={newProject.link} onChange={handleProjectChange} style={inputStyle} />

          <button onClick={addProject} style={btnStyle}>Add Project</button>
          <button onClick={saveProfile} style={{ ...btnStyle, background: "#27ae60" }}>Save Profile</button>
        </div>

        {/* Preview Section */}
        <div style={{ flex: 1, background: "white", padding: "20px", borderRadius: "10px", boxShadow: "0px 2px 8px rgba(0,0,0,0.1)" }}>
          <h3>Preview</h3>
          <p><b>Name:</b> {profile.name}</p>
          <p><b>Email:</b> {profile.email}</p>
          <p><b>Skills:</b> {profile.skills}</p>
          <p><b>GitHub:</b> <a href={profile.github} target="_blank" rel="noreferrer">{profile.github}</a></p>

          <h4>Projects</h4>
          {profile.projects.length === 0 ? <p>No projects added yet.</p> : profile.projects.map((p, i) => (
            <div key={i} style={{ border: "1px solid #ddd", padding: "10px", borderRadius: "5px", marginBottom: "10px" }}>
              <p><b>{p.title}</b></p>
              <p>{p.description}</p>
              <a href={p.link} target="_blank" rel="noreferrer">{p.link}</a>
              <br />
              <button onClick={() => deleteProject(i)} style={{ marginTop: "5px", background: "#c0392b", color: "white", border: "none", padding: "5px 10px", borderRadius: "5px", cursor: "pointer" }}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  margin: "5px 0",
  borderRadius: "5px",
  border: "1px solid #ccc"
};

const btnStyle = {
  display: "inline-block",
  margin: "5px 5px 0 0",
  padding: "8px 16px",
  border: "none",
  background: "#2980b9",
  color: "white",
  borderRadius: "5px",
  cursor: "pointer"
};
