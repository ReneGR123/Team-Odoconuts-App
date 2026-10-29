import { Router } from "express";
import { supabase } from "../supabase.js";

const router = Router();

//API calls
//--------------------------
//does backend work?
router.get("/", (req, res) => {
  return res.json({ status: "healthy" });
});

router.get("/supabase", async (req, res) => {
    const start = Date.now();
    
    const {error} = await supabase.from("quests").select("*");
    if(error){
        console.error("Error checking Supabase:", error);
        return res.status(500).json({ status: "unhealthy", error: "couldn't check Supabase" });
    }

    const end = Date.now();
    return res.json({ status: "healthy", supabase: "healthy", responseTime: end - start });
});

export default router;