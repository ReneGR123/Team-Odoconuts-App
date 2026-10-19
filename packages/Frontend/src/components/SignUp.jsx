import { useState } from "react"; 
import { signUp } from "../services/authService"; 
import "./Signup.css";


function SignUp() {
  const [username, setUsername] = useState(""); 
  const [displayName, setDisplayName] = useState(""); 
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");


  async function handleSubmit(event) {
    event.preventDefault(); 

    try {
       const data = await signUp(email, password, username, displayName); 
       console.log("Account created:", data); 
      } catch (error) {
	      console.error("SignUp failed:", error.message); 
      }
  }

  return (
    <div>
      <h2>Join Slap</h2>
      <h3>Start Now — We know you wanna get questing.</h3>

    <form onSubmit={handleSubmit}>
    <div className= "signup-field">
      <label htmlFor="username-field">Username</label>
      <input
	  type="text"
    id="username-field"
    placeholder="Username"
	  value={username}
	  onChange={(event) => setUsername(event.target.value)}
      />
    </div>

    {/* <div>
      <label>Display Name:</label> 
      <input
	  type="text"
	  value={displayName}
	  onChange={(event) => setDisplayName(event.target.value)}
      />
    </div> */}

    <div className= "signup-field">
      <label htmlFor="email-field">Email</label>
      <input
	  type="email"
    id="email-field"
    placeholder="Email"
	  value={email}
	  onChange={(event) => setEmail(event.target.value)}
      />
    </div> 

    <div className= "signup-field">  
      <label htmlFor="password-field">Password</label>
      <input
	  type="password"
    id="password-field"
    placeholder="Password"
	  value={password}
	  onChange={(event) => setPassword(event.target.value)}
      />
    </div>
    <div className="buttons">
      <button type="submit">Sign Up</button>
    </div>
    </form>
    </div>
  );
}

export default SignUp;
