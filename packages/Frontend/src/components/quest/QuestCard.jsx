function QuestCard({ quest }) {
  return (
    <article className="quest-card">
      <h2>{quest.name}</h2>
      <p>{quest.description}</p>
      <p>⭐ {quest.rating}</p>
      <p>⏱ {quest.durationMinutes} min</p>
    </article>
  );
}

export default QuestCard;