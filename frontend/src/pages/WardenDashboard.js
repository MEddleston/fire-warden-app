import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function WardenDashboard() {
  const [location, setLocation] = useState("");
  const [entries, setEntries] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/fire-wardens/${user.email}`)
      .then((response) => setEntries(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/fire-wardens", { staff_number: user.staff_number, first_name: user.first_name, last_name: user.last_name, location });
    window.location.reload();
  };

  const handleLogout = () => {
    localStorage.removeItem("user"); 
    navigate("/"); 
  };

  return (
    <div>
      <h1>Welcome, {user.email}</h1>
      <h2>Log Your Location</h2>
      <form onSubmit={handleSubmit}>
        <select value={location} onChange={(e) => setLocation(e.target.value)}>
          <option value="">Select Location</option>
          <option value="Alwyn Hall">Alwyn Hall</option>
          <option value="West Downs Centre">West Downs Centre</option>
        </select>
        <button type="submit">Submit</button>
      </form>

      <h2>Your Recent Entries</h2>
      <ul>
        {entries.map((entry) => (
          <li key={entry.id}>
            {entry.location} - {new Date(entry.entry_date).toLocaleString()}
          </li>
        ))}
      </ul>
      <div>
      <h1>Warden Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
    </div>
  );
}

export default WardenDashboard;
