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

  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // clear token
    navigate("/");                    // redirect to login/register page
  };

  const fetchProfile = () => {
    if (!token) return;
    axios
      .get(`${backendURL}/profile`, {
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




  const handleProfile = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://hackathon-backend-cqqf.vercel.app/profile", profile, {
        headers: { Authorization: `Bearer ${token}` }  // fixed template literal here
      });
      alert("Profile saved successfully!");
    
    } catch (error) {
      alert(error.response?.data?.error || "Error saving profile");
    }
  };




































  // const saveProfile = () => {
  //   axios
  //     .put(`${backendURL}/profile`, profile, {
  //       headers: { Authorization: `Bearer ${token}` }
  //     })
  //     .then(() => {
  //       fetchProfile();
  //       alert("Profile saved & updated!");
  //     })
  //     .catch((err) => alert(err.response?.data?.error || "Error saving profile"));
  // };

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

  if (loading) return <p style={{ textAlign: "center", marginTop: 50, fontSize: 18 }}>Loading...</p>;

  return (
    <div style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", backgroundColor: "#f0f2f5", minHeight: "100vh" }}>
      {/* Modern Navbar */}
      <nav style={{
        backgroundColor: "white",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        position: "sticky",
        top: 0,
        zIndex: 10,
        padding: "0 20px",
        height: "64px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <svg style={{ width: "32px", height: "32px", color: "#6366f1" }} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
          <span style={{
            marginLeft: "8px",
            fontSize: "1.25rem",
            fontWeight: "bold",
            color: "#1f2937"
          }}>
            PortfolioPro
          </span>
        </div>
        <button
          onClick={handleLogout}
          style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "6px 12px",
            border: "none",
            fontSize: "0.875rem",
            fontWeight: "500",
            borderRadius: "6px",
            color: "white",
            backgroundColor: "#6366f1",
            cursor: "pointer",
            transition: "background-color 0.2s ease",
            width: "auto",
            minWidth: "unset",
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#4f46e5"}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#6366f1"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: "20px", height: "20px", marginRight: "8px", flexShrink: 0 }}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
              clipRule="evenodd"
            />
          </svg>
          Logout
        </button>
      </nav>

      {/* Cards container with added paddingTop */}
      <div style={{
        display: "flex",
        gap: 30,
        padding: 30,
       marginTop:400,// <-- added padding top here
        maxWidth: 1200,
       
      }}>
        {/* Form Section */}
        <section style={{
          flex: 1,
          backgroundColor: "white",
          borderRadius: 12,
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          padding: 30,
          minWidth: 320
        }}>
          <h2 style={{ marginBottom: 20, color: "#333" }}>Edit Profile</h2>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={profile.name}
            onChange={handleChange}
            style={inputStyle}
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={profile.email}
            onChange={handleChange}
            style={inputStyle}
          />
          <input
            type="text"
            name="skills"
            placeholder="Skills (comma separated)"
            value={profile.skills}
            onChange={handleChange}
            style={inputStyle}
          />
          <input
            type="text"
            name="github"
            placeholder="GitHub Link"
            value={profile.github}
            onChange={handleChange}
            style={inputStyle}
          />

          <h3 style={{ marginTop: 30, marginBottom: 15, color: "#444" }}>Add New Project</h3>
          <input
            type="text"
            name="title"
            placeholder="Project Title"
            value={newProject.title}
            onChange={handleProjectChange}
            style={inputStyle}
          />
          <input
            type="text"
            name="description"
            placeholder="Project Description"
            value={newProject.description}
            onChange={handleProjectChange}
            style={inputStyle}
          />
          <input
            type="text"
            name="link"
            placeholder="Project Link"
            value={newProject.link}
            onChange={handleProjectChange}
            style={inputStyle}
          />

          <div style={{ marginTop: 15 }}>
            <button onClick={addProject} style={{ ...btnStyle, backgroundColor: "#0366d6" }}>
              Add Project
            </button>
            <button onClick={handleProfile} style={{ ...btnStyle, backgroundColor: "#28a745" }}>
              Save Profile
            </button>
          </div>
        </section>

        {/* Preview Section */}
        <section style={{
          flex: 1,
          backgroundColor: "white",
          borderRadius: 12,
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          padding: 30,
          minWidth: 320
        }}>
          <h2 style={{ marginBottom: 20, color: "#333" }}>Profile Preview</h2>
          <p><strong>Name:</strong> {profile.name || <em>Not added</em>}</p>
          <p><strong>Email:</strong> {profile.email || <em>Not added</em>}</p>
          <p><strong>Skills:</strong> {profile.skills || <em>Not added</em>}</p>
          <p>
            <strong>GitHub:</strong>{" "}
            {profile.github
              ? <a href={profile.github} target="_blank" rel="noreferrer" style={{ color: "#0366d6" }}>{profile.github}</a>
              : <em>Not added</em>
            }
          </p>

          <h3 style={{ marginTop: 30, marginBottom: 15, color: "#444" }}>Projects</h3>
          {profile.projects.length === 0 ? (
            <p><em>No projects added yet.</em></p>
          ) : (
            profile.projects.map((p, i) => (
              <div
                key={i}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: 8,
                  padding: 15,
                  marginBottom: 15,
                  backgroundColor: "#fafafa",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.05)"
                }}
              >
                <h4 style={{ margin: "0 0 10px 0" }}>{p.title}</h4>
                <p style={{ margin: "0 0 8px 0" }}>{p.description}</p>
                <a href={p.link} target="_blank" rel="noreferrer" style={{ color: "#0366d6" }}>{p.link}</a>
                <br />
                <button
                  onClick={() => deleteProject(i)}
                  style={{
                    marginTop: 10,
                    backgroundColor: "#d73a49",
                    color: "white",
                    border: "none",
                    padding: "6px 12px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontWeight: "600"
                  }}
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </section>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "15px",
  outline: "none",
  transition: "border-color 0.3s ease",
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
};

const btnStyle = {
  padding: "10px 20px",
  marginRight: 15,
  border: "none",
  borderRadius: "8px",
  color: "white",
  fontWeight: "700",
  cursor: "pointer",
  fontSize: "15px",
  transition: "background-color 0.3s ease"
};
