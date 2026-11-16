import { useEffect, useState } from "react"; 
import { getFavoriteQuests } from "../../services/favoriteService"; 
import "./FavoritesPanel.css"; 

function FavoritesPanel({ isOpen, onClose }) {
	const [favoriteQuests, setFavoriteQuests] = useState([]); 

	useEffect(() => {
		async function loadFavorites() {
			if (!isOpen) return; 

			try {
				const data = await getFavoriteQuests(); 
				setFavoriteQuests(data); 
			} catch (error) {
				console.error("Could not load favorite quests:", error.message); 
			}
		}

		loadFavorites(); 
	}, [isOpen]); 

	if (!isOpen) {
		return null; 
	}

	return (
		<div className="favorites-panel">
		  <div className="favorites-header">
		    <h2>Your Favorite Quests</h2>

		    <button type="button" className="favorites-close" onClick={onClose}>
			x 
		    </button> 
		 </div>

		<div className="favorites-list">
		  {favoriteQuests.length === 0 ? (
			  <p>No Favorites yet...</p>
		  ) : (
			  favoriteQuests.map((favorite) => (
				  <div
				    className="favorite-quest-card" key={favorite.questID}
				  >

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
	);
}

export default FavoritesPanel;
