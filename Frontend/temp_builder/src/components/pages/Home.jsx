import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../Styles/Styles.css";

const Home = () => {
  const [templates, setTemplates] = useState([]);
  const [tab, setTab] = useState("library");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/template/get-templates');
        console.log("API Response:", response.data);
    
        const templates = response.data.data; // Adjust path to match backend response
    
        const filteredTemplates = templates.filter((template) =>
          tab === 'library' ? template.type === 'library' : template.type === 'user'
        );
        setTemplates(filteredTemplates);
      } catch (error) {
        console.error('Error fetching templates:', error);
      }
    };
    

    fetchTemplates();
  }, [tab]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:8000/api/v1/template/delete-temp/${id}`
      );
      setTemplates((prevTemplates) =>
        prevTemplates.filter((template) => template._id !== id)
      );
      console.log("Template deleted successfully");
    } catch (error) {
      console.error("Error deleting template:", error);
    }
  };

  return (
    <div className="parent">
      <h1>Templates</h1>
      <div className="Homebtns">
        <button onClick={() => navigate("/template-library")}>
          Template Library
        </button>
        <button onClick={() => setTab("user")}>Saved Templates</button>
      </div>
      <div className="createTemp">
        <Link to="/editor">
          <button>Create Template</button>
        </Link>
      </div>
      <div className="template-list">
        {templates.map((template) => (
          <div key={template._id} className="template-card">
            <h3>{template.name}</h3>
            <p>
              Created: {new Date(template.createdDate).toLocaleDateString()}
            </p>
            <Link to={`/editor/${template._id}`}>
              <button>Edit</button>
            </Link>
            <button onClick={() => handleDelete(template._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
