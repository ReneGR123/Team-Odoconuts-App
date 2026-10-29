// EXAMPLE backend.js CODE TO ENSURE IT RUNS
import "dotenv/config";
import express from "express";
import cors from "cors";
import questsRouter from "./routes/quests.js";
import healthRouter from "./routes/health.js";
// import profileRouter from "./routes/profile.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

// ---------- helpers ----------


// ---------- routes ----------
app.use("/api/quests", questsRouter);
app.use("/api/health", healthRouter);


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});