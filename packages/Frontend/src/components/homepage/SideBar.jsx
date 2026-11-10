import {
  Compass,
  Plus,
  Users,
  Heart,
  BarChart3,
  Sparkles
} from "lucide-react";

import "./SideBar.css";

function SideBar({ onCreateQuest }) {
  return (
    <div className="side-bar">
      <button className="sidebar-button" aria-label="Add Quest" onClick={onCreateQuest}>
        <Plus />
      </button>

      <div className="sidebar-divider"></div>

      <button className="sidebar-button" aria-label="Discover">
        <Compass />
      </button>

      <button className="sidebar-button" aria-label="Friends">
        <Users />
      </button>

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
