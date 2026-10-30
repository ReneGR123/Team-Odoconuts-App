import { useState } from "react"; 
import { logIn } from "../services/authService"; 
import "./SignLog.css";
import { useNavigate } from "react-router-dom"; 
import { Link } from "react-router-dom";
import logo from "../assets/SLAP_Logo.png";
import patrick from "../assets/dumb-patrick.png";


function LogIn() {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");


  async function handleSubmit(event) {
    event.preventDefault(); 

    try {
       const data = await logIn(email, password); 
       console.log("Logged in:", data);
       navigate("/profile") 

      } catch (error) {
	      console.error("LogIn failed:", error.message); 
      }
  }

  return (
    <main className="signlog">
      <img className="Slap-logo-black" src={logo} alt="Logo" />
      <img className="Patrick" src={patrick} alt="Dumb Patrick"/>
      <div className="signlog-content">
      <header className="header"> 
        <h1>Wecome back Quester</h1>
        <p>Lets get back to questing.</p>
      </header>

    <form onSubmit={handleSubmit}>
    <div className= "signlog-field">
      <label htmlFor="email-field">Email</label>
      <input
	      type="text"
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
        autoComplete="current-password"
        required
	      value={password}
	      onChange={(event) => setPassword(event.target.value)}
      />
    </div>

    <div className="buttons">
      <button type="submit">Login</button>
    </div>
    <p>First time questing? <Link to="/signup">Sign Up</Link></p>
    </form>
    </div>
    </main>
  );
}

export default LogIn;