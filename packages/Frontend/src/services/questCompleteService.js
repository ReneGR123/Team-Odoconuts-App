import { apiRequest } from "./api"; 

export async function completeQuest(questID) {
   return apiRequest(`/quest-complete/${questID}`, {
	 method: "POST", 
   }); 
}

export async function getCompletedQuests() {
   return apiRequest("/quest-complete"); 
}
