import { useState } from "react";
import {
  Compass,
  Plus,
  Users,
  Heart,
  BarChart3,
  Sparkles,
  Navigation
} from "lucide-react"; 
import { FriendsTab } from "../FriendsTab";
import "./SideBar.css";

function SideBar({ onCreateQuest }) {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  return (
    <div className="side-bar">
      <button className="sidebar-button" aria-label="Add Quest" onClick={onCreateQuest}>
        <Plus />
      </button>

      <div className="sidebar-divider"></div>

      <button className="sidebar-button" aria-label="Discover">
        <Compass />
      </button>

      <button className="sidebar-button" aria-label="Add Quest">
        <Plus />
      </button>

      <button
        className="sidebar-button"
        aria-label="Friends"
        onClick={() => setIsOverlayOpen(true)}
      >
        <Users />
      </button>

      <FriendsTab 
        isOpen={isOverlayOpen} 
        onClose={() => setIsOverlayOpen(false)}
      />

      <button className="sidebar-button" aria-label="Favorites">
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
