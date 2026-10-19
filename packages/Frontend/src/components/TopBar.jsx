import { User } from "lucide-react";
import "./TopBar.css";

function TopBar() {
  return (
    <div className="top-bar">
      <div className="search-container">
        <div className="logo">SLAP</div>

        <input
          className="search-bar"
          type="text"
          placeholder="where to..."
        />
      </div>

      <div className="filter-container">
        <button className="filter-button">$ Free</button>

        <button className="filter-button">
          Outdoorsy
        </button>

        <button className="filter-button">
          24HRS
        </button>
      </div>

      <button className="profile-button" aria-label="Profile">
        <User />
      </button>
    </div>
  );
}

export default TopBar;
