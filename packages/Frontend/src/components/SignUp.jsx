import { useState } from "react"; 
import { signUp } from "../services/authService"; 

function SignUp() {
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 


  async function handleSubmit(event) {
    event.preventDefault(); 

    try {
       const data = await signUp(email, password); 
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
