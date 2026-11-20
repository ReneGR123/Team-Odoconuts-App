import { booleanPointInPolygon } from "@turf/boolean-point-in-polygon";

export function findTerritoryForLocation(
  territories,
  latitude,
  longitude,
) {
  const point = {
    type: "Point",
    coordinates: [longitude, latitude],
  };

  for (const territory of territories) {
    if (!territory.boundry) {
      continue;
    }

    if (booleanPointInPolygon(point, territory.boundry)) {
      return territory.id;
    }
  }

  return null;
}
