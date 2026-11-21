import { Router } from "express";
import { requireAuth } from "../middleware/requireAuth.js";
import { supabase } from "../supabase.js";

const router = Router();

// Get all planned quests for an individual user
// GET /api/planned
router.get("/", requireAuth, async (req, res) => {
  const { data, error } = await supabase
    .from("questPlanned")
    .select(
      `questID, quest:quests (id, title, description, estTime, location:locations (name, address), photos:questPhotos (id, storagePath))`,
    )
    .eq("userID", req.user.id);

  if (error) {
    console.error("Error getting planned quests:", error);
    return res.status(500).json({ error: "Could not load planned quests." });
  }

  return res.json(data);
});

// Add a quest to planned quests
// POST /api/planned/:questID
router.post("/:questID", requireAuth, async (req, res) => {
  const { questID } = req.params;

  const { data, error } = await supabase
    .from("questPlanned")
    .insert({
      userID: req.user.id,
      questID: questID,
    })
    .select()
    .single();

  if (error) {
    console.error("Error planning quest:", error);
    return res.status(500).json({ error: "Could not add quest to planned." });
  }

  return res.status(201).json(data);
});

// Remove a quest from planned quests
// DELETE /api/planned/:questID
router.delete("/:questID", requireAuth, async (req, res) => {
  const { questID } = req.params;

  const { error } = await supabase
    .from("questPlanned")
    .delete()
    .eq("userID", req.user.id)
    .eq("questID", questID);

  if (error) {
    console.error("Error removing planned quest:", error);
    return res.status(500).json({ error: "Could not remove planned quest." });
  }

  return res.status(200).json({ message: "Quest removed from planned." });
});

export default router;
