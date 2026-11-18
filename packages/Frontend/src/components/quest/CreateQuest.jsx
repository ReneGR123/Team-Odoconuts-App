import { useEffect, useRef, useState } from "react";
import { createQuest } from "../../services/questService";
import "./CreateQuest.css"
import { uploadQuestPhoto, saveQuestPhoto } from "../../services/photoService";
import defaultSlap from "../../assets/Hand-Default.svg";
import RatedSlap from "../../assets/Hand-Rated.svg";

const WHEEL_ITEM_HEIGHT = 44; // keep in sync with --wheel-item in the CSS

function WheelPicker({ label, max, value, onChange }) {
    const listRef = useRef(null);
    const scrollTimer = useRef(null);
    const options = Array.from({ length: max + 1 }, (_, i) => i);

    // Scroll the wheel to the current value (on load and after clicks/arrow keys)
    useEffect(() => {
        const list = listRef.current;
        if (list && Math.round(list.scrollTop / WHEEL_ITEM_HEIGHT) !== value) {
            list.scrollTop = value * WHEEL_ITEM_HEIGHT;
        }
    }, [value]);

    useEffect(() => () => clearTimeout(scrollTimer.current), []);

    // When scrolling stops, read which number landed in the middle
    function handleScroll() {
        clearTimeout(scrollTimer.current);
        scrollTimer.current = setTimeout(() => {
            const index = Math.round(
                listRef.current.scrollTop / WHEEL_ITEM_HEIGHT
            );
            if (index !== value) onChange(index);
        }, 80);
    }

    function handleKeyDown(event) {
        if (event.key === "ArrowDown") {
            event.preventDefault();
            onChange(Math.min(max, value + 1));
        } else if (event.key === "ArrowUp") {
            event.preventDefault();
            onChange(Math.max(0, value - 1));
        }
    }

    return (
        <div className="duration-field">
            <span className="wheel-label">{label}</span>
            <div className="wheel">
                <div className="wheel-highlight" />
                <div
                    ref={listRef}
                    className="wheel-list"
                    role="listbox"
                    aria-label={label}
                    tabIndex={0}
                    onScroll={handleScroll}
                    onKeyDown={handleKeyDown}
                >
                    {options.map((n) => (
                        <div
                            key={n}
                            role="option"
                            aria-selected={n === value}
                            className={`wheel-item ${
                                n === value ? "wheel-item--selected" : ""
                            }`}
                            onClick={() => onChange(n)}
                        >
                            {n}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
function CreateQuest({ pickedLocation, onChooseLocation, onClose }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [locationName, setLocationName] = useState("");
    const [photos, setPhotos] = useState([]);
    const [slaps, setSlaps] = useState(null);
    const [duration, setDuration] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
    });
    const slapOptions = [1, 2, 3, 4, 5];
    const [hoveredSlaps, setHoveredSlaps] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(null);

    useEffect(() => {
        if (!photos[0]) {
            setPhotoPreview(null);
            return;
        }

        const url = URL.createObjectURL(photos[0]);
        setPhotoPreview(url);

        return () => URL.revokeObjectURL(url);
    }, [photos]);

    function handleDurationChange(event) {
        const { name, value } = event.target;

        setDuration((current) => ({
            ...current,
            [name]: Number(value),
        }));
    }

    async function handleSubmit(event) {
        event.preventDefault();

        if (!pickedLocation) {
            console.error("Please click a location on the map.");
            return;
        }
        const totalHours =
            duration.days * 24 +
            duration.hours +
            duration.minutes / 60;

        try {
            const newQuest = await createQuest({
                title,
                description,
                estTime: totalHours,
                slaps: slaps,
                latitude: pickedLocation.latitude,
                longitude: pickedLocation.longitude,            
            });

	    
	    //adding multiple photos to one quest
	    if (photos.length > 0) {
		for (const photo of photos) {
		  const storagePath = await uploadQuestPhoto(
		    newQuest.id, photo
		); 

	    const savedPhoto = await saveQuestPhoto(
	        newQuest.id, 
		storagePath
	    ); 

	    }
	  }
        } catch (error) {
            console.error(error.message);
        }
        onClose();
    }
return (
    <div className="quest-overlay">
        <div className="overlay-Bg" onClick={onClose}>
            <div className="quest-container" onClick={(e) => e.stopPropagation()}>
                <div className="quest-header">
                    <h2>Creating Quest in Region...</h2>
                    <button type="button" onClick={onClose}>
                        Close
                    </button>
                </div>

                <form className="quest-form" onSubmit={handleSubmit}>
                    <div className="quest-layout">
                        <div className="quest-photo">
                            <input
                                id="quest-photos"
                                className="photo-input"
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={(event) =>
                                    setPhotos(Array.from(event.target.files))
                                }
                            />

                            {photoPreview && (
                                <img
                                    className="quest-photo-preview"
                                    src={photoPreview}
                                    alt="Quest photo preview"
                                />
                            )}

                            <label
                                htmlFor="quest-photos"
                                className={`photo-picker ${
                                    photoPreview ? "photo-picker--change" : ""
                                }`}
                            >
                                {photoPreview ? "Change photos" : "Select from device"}
                            </label>
                            <p className="photo-prompt">Add photos here</p>
                        </div>

                        <div className="quest-fields">
                            <input
                                id="title"
                                name="title"
                                aria-label="Quest title"
                                value={title}
                                onChange={(event) =>
                                    setTitle(event.target.value)
                                }
                                placeholder="Name your quest..."
                            />

                            <fieldset className="slaps">
                                <legend>How many slaps?</legend>
                                <div
                                    className="slap-rating"
                                    onMouseLeave={() => setHoveredSlaps(null)}
                                >
                                    {slapOptions.map((value) => {
                                        const previewRating =
                                            hoveredSlaps ?? slaps;

                                        return (
                                            <label
                                                key={value}
                                                className="slap-option"
                                                onMouseEnter={() =>
                                                    setHoveredSlaps(value)
                                                }
                                            >
                                                <input
                                                    type="radio"
                                                    name="slaps"
                                                    value={value}
                                                    checked={slaps === value}
                                                    onChange={() =>
                                                        setSlaps(value)
                                                    }
                                                    aria-label={`${value} ${
                                                        value === 1
                                                            ? "slap"
                                                            : "slaps"
                                                    }`}
                                                    required
                                                />
                                                <img
                                                    src={
                                                        previewRating !== null &&
                                                        value <= previewRating
                                                            ? RatedSlap
                                                            : defaultSlap
                                                    }
                                                    alt=""
                                                />
                                            </label>
                                        );
                                    })}
                                </div>
                            </fieldset>

                            {/*<div className="cost">
                                <p>Rate the expenses.</p>
                            </div>*/}

                            <fieldset className="duration-picker">
                                <legend>How long was your venture?</legend>
                                    <WheelPicker
                                        label="Days"
                                        max={30}
                                        value={duration.days}
                                        onChange={(v) => setDuration((c) => ({ ...c, days: v }))}
                                    />
                                    <WheelPicker
                                        label="Hours"
                                        max={23}
                                        value={duration.hours}
                                        onChange={(v) => setDuration((c) => ({ ...c, hours: v }))}
                                    />
                                    <WheelPicker
                                        label="Minutes"
                                        max={59}
                                        value={duration.minutes}
                                        onChange={(v) => setDuration((c) => ({ ...c, minutes: v }))}
                                    />
                            </fieldset>  

                            <div>
                                <label htmlFor="locationName">
                                    Where exactly? 
                                </label>
                                <textarea
                                    id="locationName"
                                    name="locationName"
                                    value={locationName}
                                    onChange={(event) =>
                                        setLocationName(event.target.value)
                                    }
                                    placeholder="A specific store, floor, or spot"
                                />
                            </div>

                            <div>
                                <label htmlFor="description">Describe your Quest.</label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        value={description}
                                        onChange={(event) =>
                                            setDescription(event.target.value)
                                        }
                                        placeholder="Tell people what you did, what to look for, and any tips..."
                                    />
                            </div>

                            <div className="create-quest">
                                <button type="submit">Create Quest</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
)};
export default CreateQuest;
