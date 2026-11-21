import { User } from "lucide-react";
import { useNavigate } from "react-router-dom"; 
import "./TopBar.css";
import { supabase } from "../../utils/supabase"; 
import icon from "../../assets/SLAP_icon_white.png";
import { useState } from "react"; 

function TopBar({ onSearch, searchResults = [], onSelectQuest }) {
  const navigate = useNavigate(); 
  const [searchText, setSearchText] = useState(""); 

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
        <div className="icon-container">
          <img className="Slap-icon-white" src={icon} alt="icon" />
        </div>

        <input 
          className="search-bar"
          type="text"
          placeholder="where to..."
	  value={searchText}
	  onChange={(event) => { 
	     const value = event.target.value; 
	     setSearchText(value); 
	     onSearch(value); 
	  }}
        />

	  {searchText.trim() && (
	     <div className="search-results">
		{searchResults.length > 0 ? (
	           searchResults.map((quest) => (
		     <button
		     key={quest.id}
	             type="button"
	  	     className="search-result-item"
		     onClick={() => onSelectQuest(quest)}
		     >
		     <span className="search-result-title">
			   {quest.title}
			   </span>

		     <span className="search-result-location">
			  {quest.location?.name || quest.location?.address}
		     </span>
                     </button>
                    ))
                 ) : (
                     <div className="search-no-results">
                         No quests found
                     </div>
                   )}
                </div>
             )}
	  </div>

      <div className="filter-container">
        <button className="filter-button">Free</button>

        <button className="filter-button">
          Outdoorsy
        </button>

        <button className="filter-button">
          24HRS
        </button>
        <button className="filter-button">
          Cheap
        </button>
        <button className="filter-button">
          Scenic
        </button>
        <button className="filter-button">
          Short
        </button>
        <button className="filter-button">
          Solo
        </button>
        <button className="filter-button">
          Group
        </button>
      </div>

      <button className="profile-button" aria-label="Profile" onClick={ handleProfileClick }>
        <User />
      </button>
    </div>
  );
}

export default TopBar;
