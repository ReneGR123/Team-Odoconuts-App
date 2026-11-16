import { useState } from "react"; 
import { Heart, Pencil, Trash2 } from "lucide-react";
import { getQuestPhotoUrl } from "../../services/photoService";
import { favoriteQuest, unfavoriteQuest, } from "../../services/favoriteService"; 


function QuestCard({ quest, initiallyFavorited = false, onFavoriteChange, editable = false, onEdit, onDelete}) {
  const [isFavorited, setIsFavorited] = useState(initiallyFavorited);
  const [showDescription, setShowDescription] = useState(false); 
  const photoUrl = quest.photos?.length > 0 ? getQuestPhotoUrl(quest.photos[0].storagePath) : null; 

  async function handleFavoriteClick() {
    try {
      if (isFavorited) {
	 await unfavoriteQuest(quest.id); 
	 setIsFavorited(false); 
	 onFavoriteChange?.(quest.id, false); 
      } else {
	 await favoriteQuest(quest.id); 
	 setIsFavorited(true); 
	 onFavoriteChange?.(quest.id, true); 
      } 
    } catch (error) {
	 console.error("Error updating favorite:", error); 
    }
  }

  return (
    <article className="quest-card">
	  {/* quest image */}
       {photoUrl && (
	  <img 
	     src={photoUrl}
	     alt={quest.title}
	     className="quest-card-image"
	  />
  )}

     {/* favorite button */} 
      <button className="favorite-button" aria-label={isFavorited ? "Unfavorite quest" : "Favorite quest"}
	  onClick={handleFavoriteClick} >
	  <Heart fill={isFavorited ? "currentColor" : "none"} />
      </button>

      {/* quest information */}
      {editable && (
	  <button type="button" className="edit-quest-button" aria-label="Edit quest" onClick={() => onEdit?.(quest)}> 
	      <Pencil />
	  </button>
      )}

      {editable && (
	 <button 
	    type="button"
	    className="delete-quest-button"
	    aria-label="delete quest"
	    onClick={() => onDelete?.(quest)}
	 >
	   <Trash2 /> 
	 </button> 
      )}
      
      

    <div className="quest-card-details"> 
      <h2>{quest.title}</h2>
      <p className="quest-card-description" 
	  onClick={() => setShowDescription(true)}
	  >{quest.description}</p>
      <p>⭐ {quest.rating}</p>
      <p>⏱ {quest.estTime} min</p>
      <p>📍 {quest.location?.name}</p>

      {showDescription && (
	  <div
	      className="description-overlay"
	      onClick={(event) => setShowDescription(false)}
	  >
	      <div
	         className="description-popup"
	         onClick={(event) => event.stopPropagation()}
	      >
	        <h3>{quest.title}</h3>

	        <p>{quest.description}</p>

	        <button
	           type="button"
	           onClick={() => setShowDescription(false)}
	        >
	          Close
	        </button>
	     </div>
	   </div>
      )}

    </div>
    </article>
  );
}

export default QuestCard;
