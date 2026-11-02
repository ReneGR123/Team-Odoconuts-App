import { Router } from "express";
import { supabase } from "../supabase.js";

const router = Router();

router.get("/", async (req, res) => {
    const { data, error} = await supabase.from("users").select("*");
    if(error){
        console.error("Error getting users:", error);
        return res.status(500).json({error: "couldn't load"});
    }

    return res.json(data);
    });

export default router;