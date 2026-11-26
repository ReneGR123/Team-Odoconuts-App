// EXAMPLE backend.js CODE TO ENSURE IT RUNS
import "dotenv/config";
import express from "express";
import cors from "cors";
import questsRouter from "./routes/quests.js";
import healthRouter from "./routes/health.js";
// import profileRouter from "./routes/profile.js";
import categoriesRouter from "./routes/categories.js";
import usersRouter from "./routes/users.js";
import territorysRouter from "./routes/territories.js";
import authRouter from "./routes/auth.js";
// import favoriting 
import favoritesRouter from "./routes/favorites.js";
//import photos 
import questPhotosRouter from "./routes/questPhotos.js";
import questCompleteRouter from "./routes/questComplete.js";
//leaderboard imports 
import leaderboardRouter from "./routes/leaderboard.js"; 

import plannedRouter from "./routes/planned.js"; 

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

// ---------- helpers ----------


// ---------- routes ----------
app.use("/api/quests", questsRouter);
app.use("/api/health", healthRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);
app.use("/api/territories", territorysRouter);
app.use("/api/favorites", favoritesRouter); 
app.use("/api/quest-photos", questPhotosRouter); 
app.use("/api/quest-complete", questCompleteRouter); 
//more leaderboard
app.use("/api/leaderboard", leaderboardRouter); 

app.use("/api/planned", plannedRouter); 

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

export default app; 
