import { apiRequest } from "./api";

export async function getQuests() {
    return apiRequest("/quests");
}