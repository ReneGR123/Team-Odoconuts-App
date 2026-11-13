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
    .select("*, location:locations(*)")
    .eq("creatorID", req.user.id);

  if (error) {
    console.error("Error getting created quests:", error);
    return res.status(500).json({ error: "Could not load your quests." });
  }

  res.json(data);
});

export default router;
