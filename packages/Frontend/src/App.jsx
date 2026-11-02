import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import QuestMap from "./components/QuestMap.jsx";
import TopBar from "./components/TopBar";
import SideBar from "./components/SideBar";
import SignUp from "./components/SignUp";
// import { getQuests } from "./services/questService";
import LogIn from "./components/LogIn";
import UserProfile from "./components/UserProfile"; 
import CreateQuest from "./components/CreateQuest.jsx";
import "./App.css";

// chooses and arranges the current page
function App() {
	const [isCreateQuestOpen, setIsCreateQuestOpen] = useState(false);
	const [isPickingLocation, setIsPickingLocation] = useState(false);
	const [pickedLocation, setPickedLocation] = useState(null);

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
			/>

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
