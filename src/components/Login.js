import React, { useState } from "react";
import "./Login.css"; // Import your Login-specific styles


function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrorMessage(""); // Clear previous error message
    setIsSubmitting(true);
    setIsDisabled(true);

    if (username.trim() === "" || password.trim() === "") {
      setErrorMessage("Please fill in both Username and Password fields.");
      setIsSubmitting(false);
      setIsDisabled(false);
      return;
    }

    const loginData = {
      username,
      password,
    };

    // API call to get the JWT token
    fetch("https://prephosting123-a9ed4820472a.herokuapp.com/auth/api/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 401) {
            throw new Error("Invalid username or password.");
          } else {
            throw new Error("An error occurred during login. Please try again later.");
          }
        }
        return response.json();
      })
      .then((data) => {
        const token = data.access;
        localStorage.setItem("jwtToken", token); // Store token in localStorage
        setIsSubmitting(false);
        setIsDisabled(true);
        window.location.href = "../Dashboard/dashboard.html"; // Redirect on success
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setIsSubmitting(false);
        setIsDisabled(false);
      });
  };

  return (
    <div className="container">
      <div className="logo-container">
      
  <img src="/images/Authentication/Login/PrepPrimeLogo.jpg" alt="PREPPRIME Logo" />


      </div>
      <div className="login-container">
        <h2>Login to Your Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {errorMessage && <p id="red" style={{ color: "red" }}>{errorMessage}</p>}
          <button type="submit" className="login-btn" disabled={isDisabled}>
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="footer">
          <p>Forgot your password? <a href="ForgotPassword.html">Click here</a></p>
          <p>Prepprime © Copyright 2024</p>
          <div className="terms">
            <a href="https://prepprime.com/contact-us-2/">Contact Us</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
