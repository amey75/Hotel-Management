import React, { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate, Link } from "react-router-dom";

function SignUp() {
    const [formData, setFormData] = useState({
        name: "",
        user_email: "",
        phone: "",
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
            const response = await axios.post("http://localhost:5000/", formData);
            alert(response.data.message);
            navigate("/Hotels", {
                state: {
                    name: formData.name,
                    user_email : formData.user_email
                }
            });
        } catch (error) {
            alert(error.response?.data?.error || "Something went wrong!");
        }
    };

    return (
        <div className="signup-container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit} className="signup-form">
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    autoComplete="true"
                />
                <input
                    type="email"
                    name="user_email"
                    placeholder="Email"
                    value={formData.user_email}
                    onChange={handleChange}
                    required
                    autoComplete="true"

                />
                <input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    value={formData.phone}
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
                <button type="submit">Sign Up</button>
            </form>
            <br />
            Already Signed In? <Link to={"/login"}>Login</Link>
        </div>

    );
}

export default SignUp;
