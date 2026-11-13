import { supabase } from "../utils/supabase";
import { apiRequest } from "./api"; 

export async function uploadQuestPhoto(questID, photo) {
  const fileExtension = photo.name.split(".").pop();
  const fileName = `${crypto.randomUUID()}.${fileExtension}`;
  const storagePath = `${questID}/${fileName}`;

  const { error } = await supabase.storage
    .from("quest-images")
    .upload(storagePath, photo);

  if (error) {
    throw new Error(error.message);
  }

  return storagePath;
}

export async function saveQuestPhoto(questID, storagePath) {
  return apiRequest("/quest-photos", {
    method: "POST", 
    body: JSON.stringify({
      questID, 
      storagePath, 
    }), 
  }); 
}

export function getQuestPhotoUrl(storagePath) {
  const { data } = supabase.storage
    .from("quest-images")
    .getPublicUrl(storagePath); 

  return data.publicUrl; 
}

export async function uploadProfilePicture(userID, photo) {
  const fileExtension = photo.name.split(".").pop(); 
  const fileName = `${crypto.randomUUID()}.${fileExtension}`; 
  const storagePath = `${userID}/${fileName}`;
  
  const { error } = await supabase.storage
    .from("profile-images")
    .upload(storagePath, photo); 

  if (error) {
    throw new Error(error.message); 
  }
  return storagePath; 
}

export async function saveProfilePicture(storagePath) {
  return apiRequest("/users/profile-picture", {
    method: "PATCH", 
    body: JSON.stringify({
	storagePath, 
    }), 
  }); 
}

export function getProfilePictureUrl(storagePath) {
  if (!storagePath) return null; 

  const { data } = supabase.storage
    .from("profile-images")
    .getPublicUrl(storagePath); 

  return data.publicUrl; 
}

export async function getMyProfile() {
  return apiRequest("/users/me"); 
}
