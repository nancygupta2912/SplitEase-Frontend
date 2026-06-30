import { useState } from "react";
import "./Login.css";
import { login } from "../services/authService";
import { Link,useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async () => {
        if (!email.trim() || !password.trim()) {
            alert("Please enter both email and password.");
            return;
        }

        try {
            const data = await login({
                email,
                password
            });

            // console.log(data);

            localStorage.setItem("token", data.token);

            localStorage.setItem("user",JSON.stringify(data.user));

            navigate("/dashboard");

        }
        catch (error) {

            const message = error.response?.data?.message;

            if (message === "User not found") {

                alert("No user is registered with this email. Please sign up first.");

            } else if (message === "Invalid password") {

                alert("Incorrect password.");

            } else if (message === "Invalid credentials") {

                alert("Invalid email or password.");

            } else {

                alert(message || "Login failed. Please try again.");

            }

        }

    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h1>SplitEase</h1>
                <p>Welcome Back 👋</p>
                <input
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />
                <button onClick={handleLogin}>
                    Login
                </button>

                <p className="signup-text">
                  Don't have an account?{" "}
                <Link to="/signup">Sign Up</Link>
                </p>

            </div>
        </div>
    );
}

export default Login;