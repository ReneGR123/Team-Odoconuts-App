import {Router} from "express";
import { supabase } from "../supabase.js";

const router = Router();

//API calls
//--------------------------
router.get("/", async (req, res) => {
  const { data, error } = await supabase.from("quests").select("*");
   
  if(error){
    console.error("Error getting quests:", error);
    res.status(500).json({error: "couldn't load"});
  }
  return res.json(data);
});

//filler for post ing a new quest, not final design as quest does not exist yet
router.post("/", async (req, res) => {
  const { title, description } = req.body ?? {};

  if(!title){
    return res.status(400).json({ error: "Missing title" });
  }

  if(!description){
    return res.status(400).json({ error: "Missing description" });
  }

  const { data, error } = await supabase.from("quests")
  .insert([{ title, description }])
  .select()
  .single();

  if (error) {
    console.error("Yo quests was not created: ", error);
    return res.status(500).json({ error: "couldn't create quest" });
  }

  return res.status(201).json(data);

});

//Future shit when quests get created
//Quest gets deleted
// router.delete("/:id", async (req, res) => {
// });

// //Quest gets reviewed
// router.patch("/:id/review", async (req, res) => {
// });
  
// //Quest gets completed
// router.patch("/:id/complete", async (req, res) => {
// });
export default router;