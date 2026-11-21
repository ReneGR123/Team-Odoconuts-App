import { Router } from "express";
import { supabase } from "../supabase.js";

const router = Router();

//API calls
//--------------------------
//get a list of territorys
router.get("/", async (req, res) => {
  const { data, error } = await supabase.from("territory").select("*");

    if(error){
    console.error("Error getting territorys:", error);
    return res.status(500).json({error: "couldn't load"});
  }
  return res.json(data);
});

export default router;