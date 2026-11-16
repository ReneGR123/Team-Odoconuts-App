import "./RegionOverlay.css";

// Side panel listing every quest in one region.
// Doesn't cover the map, so you can still pan around while it's open.
function RegionOverlay({ isOpen, regionName, quests, selectedQuestId, onSelectQuest, onClose }) {
    if (!isOpen) {
        return null;
    }

    return (
        <aside className="region-overlay">
            <div className="region-header">
                <div>
                    <h2>{regionName ?? "Region"}</h2>
                    <p className="region-count">
                        {quests.length} {quests.length === 1 ? "quest" : "quests"}
                    </p>
                </div>
                <button type="button" className="region-close" onClick={onClose}>
                    Close
                </button>
            </div>

            <hr className="region-line" />

            {quests.length === 0 ? (
                <p className="region-empty">No quests here yet.</p>
            ) : (
                <ul className="region-list">
                    {quests.map((quest) => (
                        <li key={quest.id}>
                            <button
                                type="button"
                                className={`region-quest ${quest.id === selectedQuestId ? "is-selected" : ""}`}
                                onClick={() => onSelectQuest(quest)}
                            >
                                <span className="region-quest-title">{quest.title}</span>
                                {quest.description && (
                                    <span className="region-quest-description">{quest.description}</span>
                                )}
                                <span className="region-quest-meta">
                                    ⏱ {quest.estTime} min
                                    {quest.location?.name && <> · {quest.location.name}</>}
                                </span>
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </aside>
    );
}

export default RegionOverlay;