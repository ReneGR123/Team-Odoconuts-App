import { apiRequest } from "./api";
import { supabase } from "../utils/supabase";

// export async function getQuests() {
//     return apiRequest("/quests");
// }

export async function getQuests() {
    const { data, error } = await supabase
        .from("quests")
        .select(`
            id,
            title,
            description,
            estTime,
            creatorID,
            locationID,
            location:locations (
                id,
                name,
                latitude,
                longitude,
                address
            )
        `);

    if (error) {
        throw error;
    }

  return data;
}

export async function createQuest({ title, description, estTime, locationName, address, latitude, longitude }) {
    const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) throw userError;

  if (!user) {
    throw new Error("You must be logged in to create a quest.");
  }

  const { data: location, error: locationError } = await supabase
    .from("locations")
    .insert({
      name: locationName,
      address,
      latitude,
      longitude,
    })
    .select()
    .single();

  if (locationError) throw locationError;

  const { data: quest, error: questError } = await supabase
    .from("quests")
    .insert({
      title,
      description,
      estTime,
      creatorID: user.id,
      locationID: location.id,
    })
    .select()
    .single();

  if (questError) throw questError;

  return quest;
}

export async function getMyCreatedQuests() {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) throw userError;

  if (!user) {
    throw new Error("You must be logged in.");
  }

  const { data, error } = await supabase
    .from("quests")
    .select(`
      id,
      title,
      description,
      estTime,
      creatorID,
      location:locations (
        name,
        latitude,
        longitude,
        address
      )
    `)
    .eq("creatorID", user.id);

  if (error) throw error;

  return data;
}