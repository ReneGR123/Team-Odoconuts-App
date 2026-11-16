import { useState } from "react";

import QuestMap from "./QuestMap.jsx";
import TopBar from "./TopBar";
import SideBar from "./SideBar";

import CreateQuest from "../quest/CreateQuest.jsx";
import FavoritesPanel from "../favorites/FavoritesPanel";

function HomePage() {
  const [isCreateQuestOpen, setIsCreateQuestOpen] = useState(false);
  const [isPickingLocation, setIsPickingLocation] = useState(false);
  const [pickedLocation, setPickedLocation] = useState(null);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); 

  function closeCreateQuest() {
    setIsCreateQuestOpen(false);
    setIsPickingLocation(false);
  }

  return (
    <div className="home-page">
      <QuestMap
        isPickingLocation={isPickingLocation}
        pickedLocation={pickedLocation}
        onPickLocation={setPickedLocation}
	searchQuery={searchQuery}
      />

      <TopBar onSearch={setSearchQuery} />

      <SideBar
        onCreateQuest={() => {
          setIsCreateQuestOpen(true);
          setIsPickingLocation(false);
        }}
        onFavorites={() => {
          setIsFavoritesOpen(true);
        }}
      />

      <FavoritesPanel
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
      />

      {isCreateQuestOpen && (
        <div
          className={`create-quest-backdrop ${
            isPickingLocation ? "is-hidden" : ""
          }`}
          onClick={closeCreateQuest}
        >
          <div
            className="create-quest-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeCreateQuest}
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
          onClick={() => setIsPickingLocation(false)}
        >
          Confirm location
        </button>
      )}
    </div>
  );
}

export default HomePage;
