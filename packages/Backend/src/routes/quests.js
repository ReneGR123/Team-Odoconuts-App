import {Router} from "express";
import { requireAuth } from "../middleware/requireAuth.js";
import { supabase } from "../supabase.js";
import { booleanPointInPolygon } from "@turf/boolean-point-in-polygon";

const router = Router();

//API calls
//--------------------------
//get quests
router.get("/", async (req, res) => {
const { data, error } = await supabase
        .from("quests")
        .select("*, location:locations(*), territory:territory(id, name)");
  
    if (error) {
        console.error("Error getting quests:", error);
        return res.status(500).json({ error: "couldn't load quests" });
    }

  return res.json(data);
});

//create a new quest
router.post("/", requireAuth , async (req, res) => {
  const {title, description, estTime, locationName, address, latitude, longitude} = req.body ?? {};


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
    .select("*, location:locations(*)")
    .eq("creatorID", req.user.id);

  if (error) {
    console.error("Error getting created quests:", error);
    return res.status(500).json({ error: "Could not load your quests." });
  }

  res.json(data);
});

export default router;