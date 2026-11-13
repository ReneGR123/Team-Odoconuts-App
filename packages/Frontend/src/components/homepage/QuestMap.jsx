import Map, { Marker, Popup} from "react-map-gl/maplibre";
import "./QuestMap.css"; 
import { setWorkerUrl } from "maplibre-gl"; 
import workerUrl from "maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url";
import "maplibre-gl/dist/maplibre-gl.css";
import { Heart } from "lucide-react";

// added questimports
import { useEffect, useState } from "react";
import { getQuests } from "../../services/questService";

//favorite imports
import { favoriteQuest, unfavoriteQuest, getFavoriteQuests } from "../../services/favoriteService";

//photos imports  
import { getQuestPhotoUrl } from "../../services/photoService"; 

// configure the map worker for vite
setWorkerUrl(workerUrl); 

function QuestMap({isPickingLocation, pickedLocation, onPickLocation }) {

        const [quests, setQuests] = useState([]);
        const [selectedQuest, setSelectedQuest] = useState(null);
	const [favoriteQuestIDs, setFavoriteQuestIDs] = useState([]); 

	async function handleFavorite() {
	   if (!selectedQuest) return; 
	
	   const questID = selectedQuest.id; 
	   const isFavorited = favoriteQuestIDs.includes(questID); 
	   
	   try {
	      if (isFavorited) {
	         await unfavoriteQuest(questID); 

		 setFavoriteQuestIDs(favoriteQuestIDs.filter((id) => id !==  questID)); 
		 console.log("Quest unfavorited");
	      } else {
		 await favoriteQuest(questID);
		 setFavoriteQuestIDs([...favoriteQuestIDs, questID]); 
		 console.log("Quest favorited"); 
	      }
	   } catch (error) {
	       console.error("Could not update favorite:", error.message); 
	   }
	}

        useEffect(() => {
                async function loadQuests() {
                        try {
                                const data = await getQuests();
                                setQuests(data);
                        } catch (error) {
                                console.error("Could not load quests:", error.message);
                        }
                }

		async function loadFavorites() {
		    try {
		      const data = await getFavoriteQuests(); 
		      setFavoriteQuestIDs(data.map((favorite) => favorite.questID));
		    } catch (error) {
		      console.error("Could not load favorites:", error.message); 
		    }
		}
			 

                loadQuests();
		loadFavorites(); 
        }, []);
        
        return (
                <Map initialViewState={{ longitude: -120.6596, latitude: 35.2828, zoom: 14 }}
                        style={{ width: "100vw", height: "100vh" }} 
                        mapStyle="https://tiles.openfreemap.org/styles/liberty" 
                        onClick={(event) => {
                                if (isPickingLocation) {
                                        onPickLocation({
                                                latitude: event.lngLat.lat,
                                                longitude: event.lngLat.lng,
                                        });
                                        return;
                                }
                                setSelectedQuest(null);
                        }}
                >

                {quests.map((quest) => (
                        <Marker key={quest.id} longitude={quest.location.longitude} latitude={quest.location.latitude} onClick={(event) => {event.originalEvent.stopPropagation(); setSelectedQuest(quest); }}>
                                <button type="button" className="quest-marker" >
                                        ⚔
                                </button>
                        </Marker>
                ))}

                {isPickingLocation && pickedLocation && (
                        <Marker
                                longitude={pickedLocation.longitude}
                                latitude={pickedLocation.latitude}
                        >
                                <div className="picked-location-marker">📍</div>
                        </Marker>
                )}

                {selectedQuest && (
                        <Popup longitude={selectedQuest.location.longitude} latitude={selectedQuest.location.latitude} closeButton={true} closeOnClick={false} onClose={() => setSelectedQuest(null)} >

			  <button type="button" className="favorite-button" aria-label="Favorite quest" onClick={handleFavorite}> 
			     <Heart fill={favoriteQuestIDs.includes(selectedQuest.id) ? "currentColor" : "none"} />
			  </button>
				{selectedQuest.photos?.length > 0 && (
					<img 
					   src={getQuestPhotoUrl(selectedQuest.photos[0].storagePath)}
					   alt={selectedQuest.title}
					   className="quest-photo"
					/>
				)}

                                <h2>{selectedQuest.title}</h2>
                                <p>{selectedQuest.description}</p>
                                {/* <p>⭐ {selectedQuest.rating}</p> */}
                                <p>⏱ {selectedQuest.estTime} minutes</p>
                                <p>{selectedQuest.location.address}</p>
                        </Popup>
                )}
                </Map>
        );
}

export default QuestMap;
