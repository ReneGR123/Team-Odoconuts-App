import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../src/backend.js";

//backend test for handling a request to retrieve quests from frontend
//tested backend, supabase, frontend connection
describe("Quest API system tests", () => {
  it("GET /api/quests returns a successful response", async () => {
    const response = await request(app).get("/api/quests");

    expect(response.status).toBe(200);
  });

  //testing a user who is not authenticated should not be able to make a quest 
  it("POST /api/quests prevents an unauthenticated user from creating a quest", async () => {
     const response = await request(app)
		  .post("/api/quests")
		  .send({ 
			  title: "Test Quest",
			  description: "This quest should not be created",
			  estTime: 30,
			  latitude: 35.2828,
			  longitude: -120.6596,
		  });
	  expect(response.status).toBe(401);
  });

  //tests an unauthenticated user cannot favorite a quest
   it("POST /api/favorites/:questID prevents an unauthenticated user from favoriting a quest", async () => {
	  const testQuestID = "00000000-0000-0000-0000-000000000000";
	  
	  const response = await request(app)
		  .post(`/api/favorites/${testQuestID}`);

	  expect(response.status).toBe(401);
  });
  
});

