import { describe, it, expect } from "vitest";
import { validateQuestData } from "../src/utils/questValidation.js";

describe("validateQuestData", () => {
   //testing quest cannot have an empty title 
   it("rejects a quest with an empty title", () => {
    const quest = {
      title: "",
      description: "Walk around campus and find the statue.",
      estTime: 30,
      locationName: "Cal Poly",
      address: "1 Grand Ave",
      latitude: 35.305,
      longitude: -120.6625,
    };

    const result = validateQuestData(quest);

    expect(result.valid).toBe(false);
  });

  it("rejects a quest with an invalid estTime", () => {
	  const quest = {
		  title: "campus adventure", 
		  description: "explore the cal poly campus.", 
		  estTime: 0, 
		  locationName: "Cal Poly", 
		  address: "1 Grand Ave", 
		  latitude: 35.305, 
		  longitude: -120.6625, 
	  }; 

	  const result = validateQuestData(quest); 

	  expect(result.valid).toBe(false); 
  }); 
});
