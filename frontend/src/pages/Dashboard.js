import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
    const [wardens, setWardens] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/api/fire-wardens")
            .then(res => setWardens(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div>
            <h1>Fire Warden Dashboard</h1>
            <table>
                <thead>
                    <tr>
                        <th>Staff Number</th>
                        <th>Name</th>
                        <th>Location</th>
                        <th>Entry Time</th>
                    </tr>
                </thead>
                <tbody>
                    {wardens.map(warden => (
                        <tr key={warden.id}>
                            <td>{warden.staff_number}</td>
                            <td>{warden.first_name} {warden.last_name}</td>
                            <td>{warden.location}</td>
                            <td>{new Date(warden.entry_time).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Dashboard;
