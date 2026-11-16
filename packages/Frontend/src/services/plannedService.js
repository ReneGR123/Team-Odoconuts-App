import { apiRequest } from "./api";

export async function planQuest(questID) {
  return apiRequest(`/planned/${questID}`, {
    method: "POST",
  });
}

export async function unplanQuest(questID) {
  return apiRequest(`/planned/${questID}`, {
    method: "DELETE",
  });
}

export async function getPlannedQuests() {
  return apiRequest("/planned");
}
