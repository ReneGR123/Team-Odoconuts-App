import { Heart } from "lucide-react";
import { getQuestPhotoUrl } from "../../services/photoService"; 

function QuestCard({ quest }) {
  const photoUrl = quest.photos?.length > 0 ? getQuestPhotoUrl(quest.photos[0].storagePath) : null; 

  return (
    <article className="quest-card">
      {photoUrl && (
	  <img 
	     src={photoUrl}
	     alt={quest.title}
	     className="quest-card-image"
	  />
  )}

      <button className="favorite-button" aria-label="Favorite quest">
	  <Heart />
      </button>

    <div className="quest-card-details"> 
      <h2>{quest.title}</h2>
      <p>{quest.description}</p>
      <p>⭐ {quest.rating}</p>
      <p>⏱ {quest.estTime} min</p>
      <p>📍 {quest.location?.name}</p>
    </div>
    </article>
  );
}

export default QuestCard;
