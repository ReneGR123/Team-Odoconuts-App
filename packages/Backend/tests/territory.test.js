import { describe, it, expect } from "vitest";
import { findTerritoryForLocation } from "../src/utils/territory.js";

describe("findTerritoryForLocation", () => {
  // testing whether app correctly determines which territory a quest belongs to
  it("returns the territory ID when a location is inside a territory", () => {
    const territories = [
      {
        id: "territory-1",
        boundry: {
          type: "Polygon",
          coordinates: [
            [
              [-121, 35],
              [-120, 35],
              [-120, 36],
              [-121, 36],
              [-121, 35],
            ],
          ],
        },
      },
    ];

    const result = findTerritoryForLocation(
      territories,
      35.305,
      -120.6625,
    );

    expect(result).toBe("territory-1");
  });

  it ("returns null when a location is outisde all territories", () => {
	  const territories = [
		  {
		       id: "territory-1", 
		       boundry: {
		            type: "polygon", 
			    coordinates: [
				    [
					    [-121, 35], 
					    [-120, 35], 
					    [-120, 36], 
					    [-121, 36], 
					    [-121, 35], 
				    ], 
			    ], 
		       }, 
		  }, 
	  ]; 

	  const result = findTerritoryForLocation(
		  territories, 
		  40.0, 
		  -120.5, 
	  ); 

	  expect(result).toBe(null); 
  }); 
});
