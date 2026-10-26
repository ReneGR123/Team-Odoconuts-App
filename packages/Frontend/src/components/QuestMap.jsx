import Map, { Marker, Popup} from "react-map-gl/maplibre"; 
import { setWorkerUrl } from "maplibre-gl"; 
import workerUrl from "maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url";
import "maplibre-gl/dist/maplibre-gl.css";

// added questimports
import { useState } from "react";
import { mockQuests } from "../data/mockQuests";

// configure the map worker for vite
setWorkerUrl(workerUrl); 

function QuestMap() {
        const [selectedQuest, setSelectedQuest] = useState(null);

        return (
                <Map initialViewState={{ longitude: -120.6596, latitude: 35.2828, zoom: 14 }}
		style={{ width: "100vw", height: "100vh" }} 
                mapStyle="https://tiles.openfreemap.org/styles/liberty" >

                {mockQuests.map((quest) => (
                        <Marker key={quest.id} longitude={quest.longitude} latitude={quest.latitude} onClick={(event) => {event.originalEvent.stopPropagation(); 
                                if (selectedQuest?.id === quest.id) {
                                        setSelectedQuest(null);
                                } else {
                                        setSelectedQuest(quest);
                                }
                        }}>
                                <button type="button" className="quest-marker" >
                                        ⚔
                                </button>
                        </Marker>
                ))}

                {selectedQuest && (
                        <Popup longitude={selectedQuest.longitude} latitude={selectedQuest.latitude} closeButton={true} closeOnClick={false} onClose={() => setSelectedQuest(null)} >
                                <h2>{selectedQuest.name}</h2>
                                <p>{selectedQuest.description}</p>
                                <p>⭐ {selectedQuest.rating}</p>
                                <p>⏱ {selectedQuest.durationMinutes} minutes</p>
                        </Popup>
                )}
                </Map>
        );
}

export default QuestMap;