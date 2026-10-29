// EXAMPLE backend.js CODE TO ENSURE IT RUNS
import "dotenv/config";
import express from "express";
import cors from "cors";
import questsRouter from "./routes/quests.js";
// import profileRouter from "./routes/profile.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

// ---------- helpers ----------


// ---------- routes ----------
//Anything with /api/quests will be handled by quest.js
app.use("/api/quests", questsRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});