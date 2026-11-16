import {Router} from "express";
import { createAuthClient } from "../supabase.js";

const router = Router();
//API calls
//--------------------------
//login
router.post("/login", async (req, res) => {
  const { email, password } = req.body ?? {};

  if (typeof email !== "string" || typeof password !== "string") {
    return res.status(400).json({ error: "Missing email or password" });
  }

  const { data, error } = await createAuthClient().auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  return res.json({ data });
});

export default router;