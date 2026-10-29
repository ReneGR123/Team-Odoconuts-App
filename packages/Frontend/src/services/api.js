import { apiRequest } from "./api";

export async function getQuests() {
  return apiRequest("/quests");
}

export async function createQuest(title, description) {
  return apiRequest("/quests", {
    method: "POST",
    body: JSON.stringify({ title, description })
  });
}