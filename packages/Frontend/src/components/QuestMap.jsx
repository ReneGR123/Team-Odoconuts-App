import Map from "react-map-gl/maplibre"; 
import { setWorkerUrl } from "maplibre-gl"; 
import workerUrl from "maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url";
import "maplibre-gl/dist/maplibre-gl.css";

// configure the map worker for vite
setWorkerUrl(workerUrl); 

function QuestMap() {
        return (
                <Map initialViewState={{ longitude: -120.6596, latitude: 35.2828, zoom: 14 }}
		style={{ width: "100vw", height: "100vh" }} 
                mapStyle="https://tiles.openfreemap.org/styles/liberty" />
        );
}

export default QuestMap;

