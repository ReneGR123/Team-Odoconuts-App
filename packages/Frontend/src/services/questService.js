import { apiRequest } from "./api";
import { supabase } from "../utils/supabase";

export async function getQuests() {
    return apiRequest("/quests");
}


export async function createQuest(quest){
  return apiRequest("/quests", {
    method: "POST",
    body: JSON.stringify(quest),
  });
}

export async function getMyCreatedQuests(){
  return apiRequest("/quests/mine");
}

export async function updateQuest(questID, quest) {
  return apiRequest(`/quests/${questID}`, {
     method: "PATCH", 
     body: JSON.stringify(quest), 
  }); 
}

export async function deleteQuest(questID) {
  return apiRequest(`/quests/${questID}`, {
     method: "DELETE", 
  }); 
}