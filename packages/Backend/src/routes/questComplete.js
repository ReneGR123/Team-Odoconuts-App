import { Router } from "express";
import { requireAuth } from "../middleware/requireAuth.js";
import { supabase } from "../supabase.js";

const router = Router();

router.get("/", requireAuth, async(req, res) => {
  const { data, error } = await supabase
    .from("questComplete")
    .select(`*, quest:quests (
       id, 
       title, 
       estTime)`)
    .eq("userID", req.user.id); 

  if (error) {
    console.error("Error getting completed quests:", error); 
    return res.status(500).json({
      error: "Could not load completed quests.", 
    }); 
  }

  return res.json(data); 
}); 

router.post("/:questID", requireAuth, async (req, res) => {
  const { questID } = req.params;

  const { data, error } = await supabase
    .from("questComplete")
    .insert({
      userID: req.user.id,
      questID: questID,
    })
    .select()
    .single();

  if (error) {
    console.error("Error completing quest:", error);
    return res.status(500).json({
      error: "Could not complete quest.",
    });
  }

  return res.status(201).json(data);
});

export default router;
