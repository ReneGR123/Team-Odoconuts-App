import { useState } from "react";
import { createQuest } from "../../services/questService";
import { uploadQuestPhoto, saveQuestPhoto } from "../../services/photoService";

function CreateQuest({ pickedLocation, onChooseLocation }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [estTime, setEstTime] = useState("");
    const [locationName, setLocationName] = useState("");
    const [address, setAddress] = useState("");
    const [photos, setPhotos] = useState([]);

    async function handleSubmit(event) {
        event.preventDefault();

        if (!pickedLocation) {
            console.error("Please click a location on the map.");
            return;
        }

        try {
            const newQuest = await createQuest({
                title,
                description,
                estTime: Number(estTime),
                locationName,
                address,
                latitude: pickedLocation.latitude,
                longitude: pickedLocation.longitude,            
            });

	      console.log("Quest created!!", newQuest)
	    
	    //adding multiple photos to one quest
	    if (photos.length > 0) {
		for (const photo of photos) {
		  const storagePath = await uploadQuestPhoto(
		    newQuest.id, photo
		); 

	    console.log("Photo uploaded!!", storagePath); 

	    const savedPhoto = await saveQuestPhoto(
	        newQuest.id, 
		storagePath
	    ); 

	    console.log("Photo saved to database!!", savedPhoto); 
	    }
	  }
        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <button type="button" onClick={onChooseLocation}>
                {pickedLocation
                    ? "Change location on map"
                    : "Choose location on map"}
            </button>

            {pickedLocation && (
                <p>
                    Selected: {pickedLocation.latitude.toFixed(5)},{" "}
                    {pickedLocation.longitude.toFixed(5)}
                </p>
            )}

            <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Quest title"
            />

            <textarea
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Quest description"
            />

            <input
                type="number"
                value={estTime}
                onChange={(event) => setEstTime(event.target.value)}
                placeholder="Estimated time in minutes"
            />

            <input
                value={locationName}
                onChange={(event) => setLocationName(event.target.value)}
                placeholder="Location name"
            />

            <input
                value={address}
                onChange={(event) => setAddress(event.target.value)}
                placeholder="Address"
            />

	    <input 
	    	type="file"
	        accent="image/*"
	        multiple
	        onChange={(event) => setPhotos(Array.from(event.target.files))}
	    />

            <button type="submit">Create Quest</button>
        </form>
    );
}

export default CreateQuest;
