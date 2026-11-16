import { Router } from "express";
import { supabase } from "../supabase.js";
import { requireAuth } from "../middleware/requireAuth.js";

const router = Router();

router.get("/me", requireAuth, async (req, res) => {
    const { data, error} = await supabase
	.from("users")
	.select("*")
	.eq("id", req.user.id)
	.single();

    if(error){
        console.error("Error getting users:", error);
        return res.status(500).json({error: "couldn't load user profile."});
    }

    return res.json(data);
    });

router.patch("/profile-picture", requireAuth, async (req, res) => {
    const { storagePath } = req.body ?? {}; 

    if (!storagePath) {
	return res.status(400).json({
	   error: "storagePath is required", 
	}); 
    }

    const { data, error } = await supabase
        .from("users")
	.update({
	   profile_pic: storagePath, 
	})
	.eq("id", req.user.id)
	.select()
	.single(); 
    
   if (error) {
	console.error("Error updating profile picture:", error); 
	return res.status(500).json({
	   error: "Could not update profile picture.", 
	}); 
   }

   return res.json(data); 
}); 

export default router;
