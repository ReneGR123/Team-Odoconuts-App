import {
  Maximize2,
  Compass,
  Plus,
  Users,
  Heart,
  BarChart3,
  Navigation
} from "lucide-react";

import "./SideBar.css";

function SideBar() {
  return (
    <div className="side-bar">
      <button className="sidebar-button" aria-label="Expand">
        <Maximize2 />
      </button>

      <div className="sidebar-divider"></div>

      <button className="sidebar-button" aria-label="Discover">
        <Compass />
      </button>

      <button className="sidebar-button" aria-label="Add Quest">
        <Plus />
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

      <button className="sidebar-button" aria-label="Explore">
        <Navigation />
      </button>
    </div>
  );
}

export default SideBar;
