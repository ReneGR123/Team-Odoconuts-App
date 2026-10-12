import { useState } from "react"; 
import { signUp } from "../services/authService"; 

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
      <h2>Create an Account</h2>

    <form onSubmit={handleSubmit}>
    <div>
      <label>Username:</label>
      <input
	  type="text"
	  value={username}
	  onChange={(event) => setUsername(event.target.value)}
      />
    </div>

    <div>
      <label>Display Name:</label> 
      <input
	  type="text"
	  value={displayName}
	  onChange={(event) => setDisplayName(event.target.value)}
      />
    </div>

    <div>
      <label>Email:</label>
      <input
	  type="email"
	  value={email}
	  onChange={(event) => setEmail(event.target.value)}
      />
    </div> 

    <div>  
      <label>Password</label>
      <input
	  type="password"
	  value={password}
	  onChange={(event) => setPassword(event.target.value)}
      />
    </div>
    
    <button type="submit">Sign Up</button>
    </form>
    </div>
  );
}

export default SignUp;
