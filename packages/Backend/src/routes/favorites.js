import { Router } from "express"; 
import { requireAuth } from "../middleware/requireAuth.js"; 
import { supabase } from "../supabase.js"; 

const router = Router(); 

//get all favorites for an individual user 
//get /api/favorites
router.get("/", requireAuth, async (req, res) => {
    const { data, error } = await supabase
	.from("questFavorites")
	.select(`questID, quest:quests (id, title, description, estTime, location:locations (name, address), photos:questPhotos (id, storagePath))`)
	.eq("userID", req.user.id); 
    
   if (error) {
	console.error("Error getting favorites:", error); 
	return res.status(500).json({ error: "Could not load favorites." }); 
   }

   return res.json(data); 
}); 
   

//favorite a quest
//POST /api/favorites/:questID
router.post("/:questID", requireAuth, async (req, res) => {
    const { questID } = req.params; 

    const { data, error } = await supabase
	.from("questFavorites") 
	.insert({
	   userID: req.user.id, 
	   questID: questID, 
	}) 
	.select()
	.single(); 
   
    if (error) {
        console.error("Error favoriting quest:", error); 
	return res.status(500).json({ error: "Could not favorite quest." }); 
    }

    return res.status(201).json(data); 
});

// unfavorite a quest 
// DELETE /api/favorites/:questID
router.delete("/:questID", requireAuth, async (req, res) => {
   const { questID } = req.params; 

   const { error } = await supabase
     .from("questFavorites")
     .delete()
     .eq("userID", req.user.id)
     .eq("questID", questID); 

   if (error) {
       console.error("Error unfavoriting quest:", error); 
       return res.status(500).json({ error: "Could not unfavorite quest." }); 
   }

   return res.status(200).json({ message: "Quest unfavorited." }); 
}); 

export default router; 
