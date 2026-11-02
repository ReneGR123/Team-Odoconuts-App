import  { Router } from "express";
import { supabase } from "../supabase.js";

//NOTE (RENE): Currently duplicate categories can be created, the supposed fix is to add something to the database
//but i'm no expert on databases, so will consult with the nut or jeanne about this
    
const router = Router();

//API calls
//--------------------------
//get a list of categories
router.get("/", async (req, res) => {
  const { data, error } = await supabase.from("categories").select("*");
   
  if(error){
    console.error("Error getting categories:", error);
    return res.status(500).json({error: "couldn't load"});
  }
  return res.json(data);
});

//post a new category
//TODO: fix duplicate category creation, currently duplicates can be created
router.post("/", async (req, res) => {
    const { name } = req.body ?? {};

    if(typeof name !== "string" || name.trim() === ""){
      return res.status(400).json({ error: "Missing name" });
    }

    const cleanName = name.trim().toLowerCase();

    const { data, error } = await supabase
    .from("categories")
    .insert([{ name: cleanName }])
    .select()
    .single();

    if (error){
        console.error("Category was not created: ", error);
        return res.status(500).json({ error: "couldn't create category" });
    }
    return res.status(201).json(data);
})


export default router;