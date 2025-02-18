import React, { useState } from "react";
import axios from "axios";

const Register = () => {
    const [formData, setFormData] = useState({
        staffNumber: "",
        firstName: "",
        lastName: "",
        location: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:5000/api/fire-wardens", formData);
        alert("Fire Warden Registered!");
    };

    return (
        <div>
            <h1>Register Fire Warden</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="staffNumber" placeholder="Staff Number" onChange={handleChange} required />
                <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} required />
                <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} required />
                <input type="text" name="location" placeholder="Location" onChange={handleChange} required />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
