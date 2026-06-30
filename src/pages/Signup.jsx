import { useState } from "react";
import { signup } from "../services/signupService";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

function Signup() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = async () => {

        if (!name.trim() || !email.trim() || !password.trim()) {
            alert("Please fill all the fields.");
            return;
        }

        try {

            await signup({
                name,
                email,
                password
            });

            alert("🎉 Account created successfully! Please login.");

            navigate("/");

        } catch (error) {

            const message = error.response?.data?.message;

            if (message === "User with this email already exists") {

                alert("An account with this email already exists.");

            } else {

                alert(message || "Signup failed.");

            }

        }

    };

    return (

        <div className="login-container">

            <div className="login-box">

                <h1>SplitEase</h1>

                <p>Join SplitEase and start managing shared expenses.</p>

                <input
                    type="text"
                    placeholder="Enter Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button onClick={handleSignup}>
                    Sign Up
                </button>

                <p className="signup-text">

                    Already have an account?{" "}

                    <Link to="/">
                        Login
                    </Link>

                </p>

            </div>

        </div>

    );

}

export default Signup;