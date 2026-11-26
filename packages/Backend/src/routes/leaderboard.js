import { Router } from "express"; 
import { requireAuth } from "../middleware/requireAuth.js"; 
import { supabase } from "../supabase.js"; 

const router = Router(); 

//get all the quests authenticated user had completed
router.get("/quests-completed", requireAuth, async (req, res) => {
	const { data, error } = await supabase
	  .from("questComplete")
	  .select("userID"); 

	//throw any errors if connection cannot happen 
	if (error) {
		console.error("Error loading leaderboard:", error); 
		return res.status(500).json({
			error: "Could not lead leaderboard.", 
		}); 
	}

	// get username
	const { data: users, error: usersError } = await supabase
	   .from("users")
	   .select("id, username"); 

	if (usersError) {
		console.error("Error loading leaderboard users:", usersError); 
		return res.status(500).json({
			error: "Could not load leaderboard users.", 
		}); 
	}

	//count how many quests the user has done in TOTAL
	const completedCounts = {}; 

	for (const completion of data) {
		const userID = completion.userID; 

		if (completedCounts[userID]) {
			completedCounts[userID]++; 
		} else {
			completedCounts[userID] = 1; 
		}
	}

	//sort the users from highest to lowest
	const leaderboard = Object.entries(completedCounts)
	  .map(([userID, questsCompleted]) => {
		  const user = users.find((user) => user.id === userID); 

		  return {
			  userID, 
			  username: user?.username ?? "Unknown User", 
			  questsCompleted,
		  }; 
	  })
	.sort((a, b) => b.questsCompleted - a.questsCompleted);

	return res.json(leaderboard);
}); 

export default router; 
