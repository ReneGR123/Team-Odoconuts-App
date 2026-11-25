import {Router} from "express";
import { requireAuth } from "../middleware/requireAuth.js";
import { supabase } from "../supabase.js";
import { booleanPointInPolygon } from "@turf/boolean-point-in-polygon";
import { validateQuestData } from "../utils/questvalidation.js";

const router = Router();

//API calls
//--------------------------
//get quests
router.get("/", async (req, res) => {
const { data, error } = await supabase
        .from("quests")
        .select(`*, location:locations(*), territory:territory(id, name), photos:questPhotos(id, storagePath)`);
  
    if (error) {
        console.error("Error getting quests:", error);
        return res.status(500).json({ error: "couldn't load quests" });
    }

  return res.json(data);
});

//create a new quest
router.post("/", requireAuth , async (req, res) => {
  const questData = req.body ?? {}; 
	const validation = validateQuestData(questData); 

	if (!validation.valid) {
		return res.status(400).json({
			error: validation.error, 
		}); 
	}

	const { title, description, estTime, locationName, address, latitude, longitude, } = questData; 

    const {data : territories, error : territoryError} = await supabase
    .from("territory")
    .select("id, boundry");


    if (territoryError) {
        console.error("Error getting territories:", territoryError);
        return res.status(500).json({ error: "Could not create quest." });
    }
    
    let territoryID = null;
    const point = {
        type: "Point",
        coordinates: [longitude, latitude],
    };

    for (const territory of territories) {
      if(!territory.boundry) {
        continue; // Skip if boundry is null
      }

    if (booleanPointInPolygon(point, territory.boundry)) {
        territoryID = territory.id;
        break;
    }

  }

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
      locationID: location.id,
      territoryID
    })
    .select("*, location:locations(*), territory:territory(id, name)")
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

// delete a quest that belongs to the authenticated user
router.delete("/:questID", requireAuth, async (req, res) => {
  const { questID } = req.params;

  // Find the quest and make sure its made by authenticated user 
  const { data: existingQuest, error: findError } = await supabase
    .from("quests")
    .select("id, creatorID, locationID")
    .eq("id", questID)
    .eq("creatorID", req.user.id)
    .single();

  if (findError || !existingQuest) {
    return res.status(404).json({
      error: "Quest not found or you do not have permission to delete it.",
    });
  }

  const { error: photoDeleteError } = await supabase
     .from("questPhotos")
     .delete()
     .eq("questID", questID); 

  if (photoDeleteError) {
     console.error("Error deleting quest photos:", photoDeleteError); 
     return res.status(500).json({
	error: "Could not delete quest photos.", 
     }); 
  }

  // completely deleting a quest from the user profile (includes all other tabs) 
  const { errror: completeDeleteError } = await supabase
	.from("questComplete")
	.delete()
	.eq("questID", questID); 

  if (completeDeleteError) {
	  console.error("Error deleting quest completions:", completeDeleteError); 
	  return res.status(500).json({
		  error: "Could not delete quest completions.", 
	  }); 
  }

  // Delete the quest
  const { error: deleteError } = await supabase
    .from("quests")
    .delete()
    .eq("id", questID)
    .eq("creatorID", req.user.id);

  if (deleteError) {
    console.error("Error deleting quest:", deleteError);
    return res.status(500).json({
      error: "Could not delete quest.",
    });
  }

  return res.json({
    message: "Quest deleted successfully.",
    questID,
  });
});

export default router;
