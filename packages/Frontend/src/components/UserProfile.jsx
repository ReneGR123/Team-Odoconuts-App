import { ArrowLeft, BookOpen, Star, Pencil, Footprints, Users, BarChart3, Plus } from "lucide-react";
import "./UserProfile.css";
import { useNavigate } from "react-router-dom"; 

function UserProfile() {
  const navigate = useNavigate(); 

  return (
    <div className="profile-page">
	
	  {/* right side of user profile */}
	<div className="profile-side-nav">
	   <div className="profile-slap-logo">SLAP</div>

	<div className-="profile-nav-buttons">
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
	    <Star />
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
    </div>
  );
}

export default UserProfile;
