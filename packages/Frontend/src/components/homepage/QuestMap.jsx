import Map, { Marker, Popup, Source, Layer} from "react-map-gl/maplibre";
import { setWorkerUrl } from "maplibre-gl";
import workerUrl from "maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url";
import "maplibre-gl/dist/maplibre-gl.css";

// added questimports
import { useEffect, useRef, useState } from "react";
import { getQuests } from "../../services/questService";
import { getTerritories } from "../../services/territoryService";
import RegionOverlay from "./RegionOverlay";

// configure the map worker for vite
setWorkerUrl(workerUrl);

function QuestMap({isPickingLocation, pickedLocation, onPickLocation }) {

        // lets us move the map from code (flyTo)
        const mapRef = useRef(null);
        const [quests, setQuests] = useState([]);
        const [selectedQuest, setSelectedQuest] = useState(null);
        const [territories,setTerritories] = useState([]);
        // id of the territory we're filtering to, null = show every quest
        const [regionFilter, setRegionFilter] = useState(null);

        const features = territories.map((territory) => ({
                type: "Feature",
                properties: { id: territory.id, name: territory.name },
                geometry: territory.boundry,
        }));

        const territoryGeoJSON = {
                type: "FeatureCollection",
                features: features,
        };

        // only the quests in the filtered territory (or all of them if no filter)
        const visibleQuests = regionFilter
                ? quests.filter((quest) => quest.territoryID === regionFilter)
                : quests;

        // name of the filtered territory, for the overlay header
        const filteredRegionName = territories.find((territory) => territory.id === regionFilter)?.name;

        function handleRegionClick(territory) {
                setRegionFilter(territory.id);
                setSelectedQuest(null); // close the popup, its quest might get hidden
        }

        // clicking a quest in the region list: open its popup and move the map to it
        function handleSelectQuestFromList(quest) {
                setSelectedQuest(quest);
                mapRef.current?.flyTo({
                        center: [quest.location.longitude, quest.location.latitude],
                        zoom: Math.max(mapRef.current.getZoom(), 16),
                        duration: 800,
                });
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

                loadQuests();
        }, []);

        useEffect(() => {
                async function loadTerritories() {
                        try {
                                const data = await getTerritories();
                                setTerritories(data);
                        } catch (error) {
                                console.error("Could not load territories:", error.message);
                        }
                }

                loadTerritories();
        }, []);

        return (
                <>
                <Map ref={mapRef}
                        initialViewState={{ longitude: -120.6596, latitude: 35.2828, zoom: 14 }}
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

                <Source id="territories" type="geojson" data={territoryGeoJSON}>
                        <Layer id="territory-fill" type="fill" paint={{ "fill-color": "#105222", "fill-opacity": 0.2 }} />
                        <Layer id="territory-outline" type="line" paint={{ "line-color": "#000000", "line-width": 2, "line-dasharray": [2, 2] }} />
                </Source>

                {visibleQuests.map((quest) => (
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
                                {selectedQuest.territory ? (
                                        <button type="button" onClick={() => handleRegionClick(selectedQuest.territory)}>
                                                Region: {selectedQuest.territory.name}
                                        </button>
                                ) : (
                                        <p>Region: None</p>
                                )}
                        </Popup>
                )}
                </Map>

                <RegionOverlay
                        isOpen={regionFilter !== null && !isPickingLocation}
                        regionName={filteredRegionName}
                        quests={visibleQuests}
                        selectedQuestId={selectedQuest?.id}
                        onSelectQuest={handleSelectQuestFromList}
                        onClose={() => {
                                setRegionFilter(null); // closing the panel shows every quest again
                                setSelectedQuest(null);
                        }}
                />

                </>
        );
}

export default QuestMap;