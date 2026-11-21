const QUEST_TABLE = "quests"
const REPORTED_COLUMN = "isReported" 


export async function reportQuest(db, questId) {
  await db.from(QUEST_TABLE).update({[REPORTED_COLUMN] : true }).eq("id", questId)
}