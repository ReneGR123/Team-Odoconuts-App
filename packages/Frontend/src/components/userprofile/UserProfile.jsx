import { ArrowLeft, BookOpen, Heart, Pencil, Footprints, Users, BarChart3, Plus, Menu } from "lucide-react";
import "./UserProfile.css";
import { useNavigate } from "react-router-dom"; 
import QuestCard from "../quest/QuestCard";
import { getMyCreatedQuests } from "../../services/questService";
import { supabase } from "../../utils/supabase";
import { useEffect, useRef, useState } from "react";
import {logOut} from "../../services/authService.js";


function UserProfile() {
  	const navigate = useNavigate();
	const [menuOpen, setMenuOpen] = useState(false);
	const menuRef = useRef(null);
	const [quests, setQuests] = useState([]);

	useEffect(() => {
		async function loadMyQuests() {
			try {
				const data = await getMyCreatedQuests();
				setQuests(data);
			} catch (error) {
				console.error("Could not load your quests:", error.message);
			}
		}

		loadMyQuests();
	}, []);

  //closes the menu when clicking outside of it
  useEffect(() => {
	if(!menuOpen) return;


	function handleClickOutside(event) {
		if (menuRef.current && !menuRef.current.contains(event.target)) {
			setMenuOpen(false);
		}
	}
		document.addEventListener("click", handleClickOutside);

		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
  }, [menuOpen]);

  async function handleLogOut() {
	try{
		await logOut();
		setMenuOpen(false);
		navigate("/");
	} catch (error) {
		console.error("Error logging out:", error.message);
	}
	
	setMenuOpen(false);
	navigate("/");
  }

  return (
    <div className="profile-page">
	
	  {/* right side of user profile */}
	<div className="profile-side-nav">
	 <button className="profile-slap-logo" onClick={() => navigate("/")} >
	  SLAP
	  </button>

	<div className="profile-nav-buttons">
		<div className="menu-wrapper" ref={menuRef}>
			<button className="profile-nav-button" aria-label="Menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
				<Menu />
			</button>

			{menuOpen && (
				<div className="menu-popup">
					<button className="menu-item menu-item-danger" onClick={() => handleLogOut()}>
						Log Out
					</button>
				</div>
			)}
		</div>


	   <button className="profile-nav-button" aria-label="Friends">
	     <Users />
	  </button>

	  <button className="profile-nav-button" aria-label="leaderboard">
	    <BarChart3 />
	  </button>

	  <button className="profile-nav-button" aria-label="Create Quest"> 
	    <Plus /> 
	  </button>
	</div>
       </div>
	
	  {/* back button user profile */}
      <button className="back-button" onClick={() => navigate("/")}>
        <ArrowLeft />
        Back
      </button>

      {/*user pfp, name, and individual stats */}
      <section className="profile-header">
        <div className="profile-picture"></div>

        <div className="profile-info">
          <h1>Username</h1>

          <div className="profile-stats">
            <div>
              <p>Quests Taken:</p>
              <strong>0</strong>
            </div>

            <div>
              <p>Quests Pioneered:</p>
              <strong>0</strong>
            </div>

            <div>
              <p>Hours Questing:</p>
              <strong>0</strong>
            </div>
          </div>
        </div>
      </section>
        
	<div className="profile-tabs">
	  <button className="profile-tab"> 
	    <BookOpen />
	    Quest History
	  </button> 

	  <button className="profile-tab">
	    <Heart />
	    Favorites
	  </button> 

	  <button className="profile-tab">
	    <Pencil />
	    Quest Created
	  </button> 

	  <button className="profile-tab">
	    <Footprints />
	    Planned
	  </button>
	</div>
     
     {/* quest grid */}
     <div className="quest-grid">
		{quests.map((quest) => (
    	<QuestCard key={quest.id} quest={quest} /> ))}
     </div>
    </div>
  );
}

export default UserProfile;
