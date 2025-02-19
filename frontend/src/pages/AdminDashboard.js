import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const [entries, setEntries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/api/fire-wardens")
      .then((response) => setEntries(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    navigate("/"); 
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <h2>All Fire Warden Entries (Last 24 Hours)</h2>
      {entries.length > 0 ? (
        <ul>
          {entries.map((entry) => (
            <li key={entry.id}>
              {entry.email} - {entry.working_location} 
              ({new Date(entry.entry_date).toLocaleString()})
            </li>
          ))}
        </ul>
      ) : (
        <p>No recent entries.</p>
      )}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default AdminDashboard;
