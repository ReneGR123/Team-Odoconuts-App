import {Router} from "express";
import { requireAuth } from "../middleware/requireAuth.js";
import { supabase } from "../supabase.js";

const router = Router();

//API calls
//--------------------------
//get quests
router.get("/", async (req, res) => {
const { data, error } = await supabase
        .from("quests")
        .select(`*, location:locations(*), photos:questPhotos(id, storagePath)`);

    if (error) {
        console.error("Error getting quests:", error);
        return res.status(500).json({ error: "couldn't load quests" });
    }

  return res.json(data);
});

//filler for post ing a new quest, not final design as quest does not exist yet
router.post("/", requireAuth , async (req, res) => {
  const {title, description, estTime, locationName, address, latitude, longitude} = req.body ?? {};

    const { data: location, error: locationError } = await supabase
    .from("locations")
    .insert({ name: locationName, address, latitude, longitude })
    .select("id")
    .single();

    if (locationError) {
    console.error("Error creating location:", locationError);
    return res.status(500).json({ error: "Could not create quest." });
  }

  const { data: quest, error: questError } = await supabase
    .from("quests")
    .insert({
      title,
      description,
      estTime,
      creatorID: req.user.id,
      locationID: location.id
    })
    .select("*, location:locations(*)")
    .single();

  if (questError) {
    // Undo step 1 so we don't leave a location with no quest
    await supabase.from("locations").delete().eq("id", location.id);
    console.error("Error creating quest:", questError);
    return res.status(500).json({ error: "Could not create quest." });
  }

  return res.status(201).json(quest);

});

//get created quests by user
// GET /api/quests/mine: quests created by the logged in user
router.get("/mine", requireAuth, async (req, res) => {
  const { data, error } = await supabase
    .from("quests")
    .select(`*, location:locations(*), photos:questPhotos(id, storagePath)`)
    .eq("creatorID", req.user.id);

  if (error) {
    console.error("Error getting created quests:", error);
    return res.status(500).json({ error: "Could not load your quests." });
  }

  res.json(data);
});

//edit a quest that belongs to an authenticated user 
router.patch("/:questID", requireAuth, async (req, res) => {
  const { questID } = req.params; 
  const { title, description, estTime, locationName, address, latitude, longitude, } = req.body ?? {}; 

  const { data: existingQuest, error: findError } = await supabase
     .from("quests")
     .select("id, creatorID, locationID")
     .eq("id", questID) 
     .eq("creatorID", req.user.id)
     .single(); 

  //get the quest and make sure it belongs to that authenticated user
  if (findError || !existingQuest) {
     return res.status(404).json({
	error: "Quest not found or you do not have permission to edit it.", 
     }); 
  }

  //update the quest information
  const { error: questError } = await supabase
    .from("quests")
    .update({ title, description, estTime, })
    .eq("id", questID)
    .eq("creatorID", req.user.id); 

  if (questError) {
    console.error("Error updating quest:", questError); 
    return res.status(500).json({
       error: "Could not update quest.", 
    }); 
  }

  //update the quest location
  const { error: locationError } = await supabase
    .from("locations")
    .update({
	 name: locationName, 
	 address, 
	 latitude, 
	 longitude, })
    .eq("id", existingQuest.locationID);

  if (locationError) {
    console.error("Error updating location:", locationError); 
    return res.status(500).json({
        error: "Quest updated, but location could not.", 
    }); 
  }

    // Return the newly updated quest
  const { data: updatedQuest, error: updatedQuestError } = await supabase
    .from("quests")
    .select(`*, location:locations(*), photos:questPhotos(id, storagePath)`)
    .eq("id", questID)
    .single();

  if (updatedQuestError) {
    console.error("Error getting updated quest:", updatedQuestError);
    return res.status(500).json({
      error: "Quest updated, but could not reload it.",
    });
  }

  return res.json(updatedQuest);
});

export default router;
