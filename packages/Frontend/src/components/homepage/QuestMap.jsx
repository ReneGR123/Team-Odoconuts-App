import Map, { Marker, Popup} from "react-map-gl/maplibre"; 
import { setWorkerUrl } from "maplibre-gl"; 
import workerUrl from "maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url";
import "maplibre-gl/dist/maplibre-gl.css";

// added questimports
import { useEffect, useState } from "react";
import { getQuests } from "../../services/questService";

// configure the map worker for vite
setWorkerUrl(workerUrl); 

function QuestMap({isPickingLocation, pickedLocation, onPickLocation }) {

        const [quests, setQuests] = useState([]);
        const [selectedQuest, setSelectedQuest] = useState(null);

        useEffect(() => {
                async function loadQuests() {
                        try {
                                const data = await getQuests();
                                setQuests(data);
                        } catch (error) {
                                console.error("Could not load quests:", error.message);
                        }
                }

                loadQuests();
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
