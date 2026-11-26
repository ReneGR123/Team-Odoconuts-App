import { useState } from "react";
import {
  Compass,
  Plus,
  Users,
  Heart,
  BarChart3,
  Sparkles,
} from "lucide-react";

import { FriendsTab } from "../friends/FriendsTab";
import "./SideBar.css";

function SideBar({ onCreateQuest, onFavorites, onFriends }) {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  return (
    <div className="side-bar">
      <button
        className="sidebar-button"
        aria-label="Add Quest"
        onClick={onCreateQuest}
      >
        <Plus />
      </button>

      <div className="sidebar-divider"></div>

      <button className="sidebar-button" aria-label="Discover">
        <Compass />
      </button>

      <button
        className="sidebar-button"
        aria-label="Friends"
        onClick={() => {
		setIsOverlayOpen((prev) => !prev); 
		onFriends(); 
	}}
      >
        <Users />
      </button>

      <FriendsTab
        isOpen={isOverlayOpen}
        onClose={() => setIsOverlayOpen(false)}
      />

      <button
        className="sidebar-button"
        aria-label="Favorites"
        onClick={onFavorites}
      >
        <Heart />
      </button>

      <button className="sidebar-button" aria-label="Stats">
        <BarChart3 />
      </button>

      <button className="sidebar-button" aria-label="Randomness">
        <Sparkles />
      </button>
    </div>
  );
}

export default SideBar;
