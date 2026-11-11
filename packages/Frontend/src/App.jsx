import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import QuestMap from "./components/homepage/QuestMap.jsx";
import TopBar from "./components/homepage/TopBar";
import SideBar from "./components/homepage/SideBar";
import SignUp from "./components/userauth/SignUp";
// import { getQuests } from "./services/questService";
import LogIn from "./components/userauth/LogIn";
import UserProfile from "./components/userprofile/UserProfile"; 
import CreateQuest from "./components/quest/CreateQuest.jsx";
import "./App.css";
import { getFavoriteQuests } from "./services/favoriteService";

// chooses and arranges the current page
function App() {
	const [isCreateQuestOpen, setIsCreateQuestOpen] = useState(false);
	const [isPickingLocation, setIsPickingLocation] = useState(false);
	const [pickedLocation, setPickedLocation] = useState(null);
	const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
	const [favoriteQuests, setFavoriteQuests] = useState([]); 

	useEffect(() => {
           async function loadFavorites() {
		if (!isFavoritesOpen) return; 

		try {
	           const data = await getFavoriteQuests(); 
		   setFavoriteQuests(data);
		} catch (error) {
		   console.error("Could not load favorite quests:", error.message); 
		}
	   }

	   loadFavorites(); 
	}, [isFavoritesOpen]);

	return (
	  <BrowserRouter> 
	     <Routes>
		<Route
		  path="/"
		  element={
		    <div className="home-page">
			<QuestMap 
				isPickingLocation={isPickingLocation}
  				pickedLocation={pickedLocation}
  				onPickLocation={setPickedLocation}
			/>
			<TopBar />
			<SideBar 
				onCreateQuest={() =>{setIsCreateQuestOpen(true); setIsPickingLocation(false);}}
			        onFavorites={() => {console.log("FAVORITES CLICKED"); 
					setIsFavoritesOpen(true)}}
			/>

			{isFavoritesOpen && (
			    <div className="favorites-panel">
				<div className="favorites-header">
				<h2>Your Favorite Quests</h2>
				<button
				  type="button"
				  className="favorites-close"
			          onClick={() => setIsFavoritesOpen(false)}>
				x 
				</button>
				</div> 

				<div className="favorites-list">
				   {favoriteQuests.length === 0 ? (
				       <p>No favorites yet...</p>
				   ) : (
				       favoriteQuests.map((favorite) => (
					  <div 
					       className="favorite-quest-card" 
					       key={favorite.questID}>
					       <h3>{favorite.quest.title}</h3>

					       <p>{favorite.quest.description}</p>
					       
					       <div className="favorite-quest-details">
					       <span>⏱ {favorite.quest.estTime} minutes</span>

					       <span>📍 {favorite.quest.location?.name}</span>
					     </div>
					   </div>
				       ))
				   )}
				</div>
			      </div>
			)}

			{isCreateQuestOpen && (
				<div
					className={`create-quest-backdrop ${ isPickingLocation ? "is-hidden" : ""}` }
					onClick={() => {setIsCreateQuestOpen(false); setIsPickingLocation(false) }}
				>
					<div
						className="create-quest-modal"
						onClick={(event) => event.stopPropagation()}
					>
						<button
							type="button"
							onClick={() => {setIsCreateQuestOpen(false); setIsPickingLocation(false);}}
						>
							×
						</button>

						<CreateQuest 
							pickedLocation={pickedLocation}
							onChooseLocation={() => setIsPickingLocation(true)}
						/>
					</div>
				</div>
			)}

			{isPickingLocation && (
  						<button
    						className="confirm-location-button"
    						type="button"
    						disabled={!pickedLocation}
    						onClick={() =>  setIsPickingLocation(false)}
  						>
    						Confirm location
  						</button>
			)}

		</div>
	}
	/>

		<Route path="/signup" element={<SignUp />} />
		<Route path="/profile" element={<UserProfile />} />
    <Route path="/login" element={<LogIn />} />
	      </Routes>
	   </BrowserRouter>
	);
}

export default App; 
