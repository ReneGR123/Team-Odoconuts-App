import { apiRequest } from "./api";

export async function getTerritories() {
    return apiRequest("/territories");
}