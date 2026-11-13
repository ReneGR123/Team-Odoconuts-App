import { ArrowLeft, BookOpen, Heart, Pencil, Footprints, Users, BarChart3, Plus, Menu } from "lucide-react";
import "./UserProfile.css";
import { useNavigate } from "react-router-dom"; 
import QuestCard from "../quest/QuestCard";
import { getMyCreatedQuests } from "../../services/questService";
import { supabase } from "../../utils/supabase";
import { useEffect, useRef, useState } from "react";
import {logOut} from "../../services/authService.js";
import { getFavoriteQuests } from "../../services/favoriteService";
import { uploadProfilePicture, saveProfilePicture, getProfilePictureUrl, getMyProfile } from "../../services/photoService"; 


function UserProfile() {
  	const navigate = useNavigate();
	const [menuOpen, setMenuOpen] = useState(false);
	const menuRef = useRef(null);
	const [quests, setQuests] = useState([]);
	const [activeTab, setActiveTab] = useState("created"); 
	//favorites state 
	const [favoriteQuests, setFavoriteQuests] = useState([]);
	//profile photo
	const [profilePicture, setProfilePicture] = useState(null); 

	console.log("ACTIVE TAB:", activeTab); 

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

	 useEffect(() => {
  async function loadProfile() {
    try {
      const user = await getMyProfile();

      console.log("LOADED PROFILE:", user);
      console.log("PROFILE PIC:", user.profile_pic);

      if (user.profile_pic) {
        setProfilePicture(user.profile_pic);
      }
    } catch (error) {
      console.error("Could not load profile:", error.message);
    }
  }

  loadProfile();
}, []); 

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



	useEffect(() => {
           async function loadFavorites() {
	     if (activeTab !== "favorites") return; 

	     try {
	       const data = await getFavoriteQuests(); 
	       setFavoriteQuests(data); 
	     } catch (error) {
	       console.error("Could not load favorite quests:", error.message); 
	     }
	   }
	 
	   loadFavorites(); 
	}, [activeTab]);

	 

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
  
  async function handleProfilePictureChange(event) {
    const photo = event.target.files[0]; 

    if (!photo) return; 
   
    try {
	const {
	     data: { user }, 
	} = await supabase.auth.getUser(); 

	if (!user) {
	   console.error("No logged in user."); 
	   return; 
	}

	const storagePath = await uploadProfilePicture(user.id, photo); 
	console.log("Profile picture uploaded:", storagePath); 
	const updatedUser = await saveProfilePicture(storagePath); 
	console.log("Profile picture saved:", updatedUser); 

	setProfilePicture(storagePath); 
    } catch (error) {
	console.error("Could not update profile picture:", error.message); 
    }
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
        <label className="profile-picture">
	  <input
	     type="file"
	     accept="image/*"
	     onChange={handleProfilePictureChange}
	     hidden
	  />

	  {profilePicture ? (
	    <img 
	       src={getProfilePictureUrl(profilePicture)}
	       alt="Profile"
	       className="profile-picture-image"
	    /> 
	  ) : (
	      "Add Photo"
	  )} 
	</label> 

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

	  <button className="profile-tab" onClick={() => {console.log("FAVORITES PROF CLICKED"); setActiveTab("favorites");}}>
	    <Heart />
	    Favorites
	  </button> 

	  <button className="profile-tab" onClick={() => setActiveTab("created")}>
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
		{activeTab === "created" && quests.map((quest) => (
    	<QuestCard key={quest.id} quest={quest} /> ))}

	{activeTab === "favorites" && favoriteQuests.map((favorite) => (
	   <QuestCard key={favorite.questID} quest={favorite.quest} />
	))}
     </div>
    </div>
  );
}

export default UserProfile;
