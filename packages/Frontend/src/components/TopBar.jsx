import { User } from "lucide-react";
import { useNavigate } from "react-router-dom"; 
import "./TopBar.css";
import { supabase } from "../utils/supabase"; 

function TopBar() {
  const navigate = useNavigate(); 

  async function handleProfileClick() {
      const { 
	data: { user }
      } = await supabase.auth.getUser(); 
      
      if (user) {
	navigate("/profile"); 
      } else {
	navigate("/signup"); 
      }
  }
  
  return (
    <div className="top-bar">
      <div className="search-container">
        <div className="logo">SLAP</div>

        <input
          className="search-bar"
          type="text"
          placeholder="where to..."
        />
      </div>

      <div className="filter-container">
        <button className="filter-button">$ Free</button>

        <button className="filter-button">
          Outdoorsy
        </button>

        <button className="filter-button">
          24HRS
        </button>
      </div>

      <button className="profile-button" aria-label="Profile" onClick={ handleProfileClick }>
        <User />
      </button>
    </div>
  );
}

export default TopBar;
