import { supabase } from "../utils/supabase";
import { apiRequest } from "./api";

//when a user presses the heart button the quest gets added to their favorites
export async function favoriteQuest(questID) {
   return apiRequest(`/favorites/${questID}`, {
    method: "POST",
  });
}

//unfavoriting a quest when button is pushed a second time by the user 
//making sure the user is logged in before accepting the request
export async function unfavoriteQuest(questID) {
  return apiRequest(`/favorites/${questID}`, {
    method: "DELETE", 
  }); 
}

// get all of individual users fav quests (logged in) 
export async function getFavoriteQuests() {
  return apiRequest("/favorites"); 
}
