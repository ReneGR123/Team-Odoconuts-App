import { Router } from "express"; 
import { requireAuth } from "../middleware/requireAuth.js"; 
import { supabase } from "../supabase.js"; 

const router = Router(); 

router.post("/", requireAuth, async (req, res) => {
	const { questID, storagePath } = req.body ?? {}; 

	if (!questID || !storagePath) {
		return res.status(400).json({
			error: "questID and storagePath are required", 
		}); 
	}

	const { data, error } = await supabase 
	  .from("questPhotos")
	  .insert({
		  questID, 
		  userID: req.user.id, 
		  storagePath, 
	  })
	  .select()
	  .single(); 

	  if (error) {
		  console.error("Error saving quest photo:", error); 
		  return res.status(500).json({
			  error: "Could not save quest photo.", 
		  }); 
	  }

	  return res.status(201).json(data); 
}); 

export default router; 
