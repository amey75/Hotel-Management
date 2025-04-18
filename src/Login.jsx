import React, { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate, Link } from "react-router-dom";

function Login() {
    const [formData, setFormData] = useState({
        user_email: "",
        password: ""
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/Login", formData);
            alert(response.data.message);
            navigate("/Hotels", {
                state: {
                    name: response.data.name,
                    user_email : formData.user_email
                }
            });
        } 
        catch (error) {
            alert(error.response?.data?.error || "Something went wrong!");
        }
    };
    return (
        <div className="signup-container">
            <h2>Log In</h2>
            <form onSubmit={handleSubmit} className="signup-form">
                <input
                    type="email"
                    name="user_email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    autoComplete="true"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Login</button>
            </form>
            <br />
            Not Signed Up Yet? <Link to={"/"}>Sign Up</Link>
        </div>
    )
}

export default Login;