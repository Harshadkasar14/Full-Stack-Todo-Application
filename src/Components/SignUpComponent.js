import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SignUpComponent() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();
  const API = "http://localhost:8080/api/users";

  async function handleSignUp() {

   if (username.length<5 || password.length<5) {
    setMessage("Username and password must be 5 character.");
    return;
  }

    try {
      await axios.post(`${API}/signup`, { username, password });
      setMessage("Signup successful. You can now log in.");
      setTimeout(() => navigate("/login"), 1500); // auto-redirect
    } catch (error) {
      if (error.response?.status === 409) {
        setMessage("User already exists. Please log in.");
      } else {
        setMessage("Signup failed. Try again.");
      }
    }
  }

  return (
    <div className="signup">
      <h2>Sign Up</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <div className="signupform">
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <button type="button" className="btn btn-success me-2" onClick={handleSignUp}>Sign Up</button>
        <p>Already have an account? <a href="/login">Login</a></p>
      </div>
    </div>
  );
}

export default SignUpComponent;
