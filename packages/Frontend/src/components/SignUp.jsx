import { useState } from "react"; 
import { signUp } from "../services/authService"; 
import "./SignLog.css";
import { useNavigate } from "react-router-dom"; 
import { Link } from "react-router-dom"; 
import logo from "../assets/SLAP_Logo_Black.svg";
import patrick from "../assets/dumb-patrick.png";


function SignUp() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");  
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");


  async function handleSubmit(event) {
    event.preventDefault(); 

    try {
       const data = await signUp(email, password, username); 
       console.log("Account created:", data);
       navigate("/profile") 

      } catch (error) {
	      console.error("SignUp failed:", error.message); 
      }
  }

  return (
    <main className="signlog">
      <img className="Slap-logo-black" src={logo} alt="Logo" />
      <img className="Patrick" src={patrick} alt="Dumb Patrick"/>
      <div className="signlog-content">
      <header className="header"> 
        <h1>Join Slap</h1>
        <p>Start Now — We know you wanna get questing.</p>
      </header>

    <form onSubmit={handleSubmit}>
    <div className= "signlog-field">
      <label htmlFor="username-field">Username</label>
      <input
	      type="text"
        id="username-field"
        name="username"
        autoComplete="username"
        required
	      value={username}
	      onChange={(event) => setUsername(event.target.value)}
      />
    </div>

    <div className= "signlog-field">
      <label htmlFor="email-field">Email</label>
      <input
	      type="email"
        id="email-field"
        name="email"
        autoComplete="email"
        required
	      value={email}
	      onChange={(event) => setEmail(event.target.value)}
      />
    </div> 

    <div className= "signlog-field">  
      <label htmlFor="password-field">Password</label>
      <input
	      type="password"
        id="password-field"
        name="password"
        autoComplete="new-password"
        required
	      value={password}
	      onChange={(event) => setPassword(event.target.value)}
      />
    </div>

    <div className="buttons">
      <button type="submit">Sign Up</button>
    </div>
    <p>
      Already have an Account? <Link to="/login">Log In</Link>
    </p>
    </form>
    </div>
    </main>
  );
}

export default SignUp;
