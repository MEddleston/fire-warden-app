import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("warden"); 
  const [first_name, setFirstName] = useState("")
  const [last_name, setLastName] = useState("")
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/signup", { email, first_name, last_name, password, role });
      navigate("/"); 
    } catch (error) {
      alert("Signup failed");
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSignup}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <input type="first_name" placeholder="First Name" value={first_name} onChange={(e) => setFirstName(e.target.value)} required />
        <input type="last_name" placeholder="Last Name" value={last_name} onChange={(e) => setLastName(e.target.value)} required />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="warden">Fire Warden</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
