// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { expect, test, vi } from "vitest";
import HomePage from "../homepage/HomePage.jsx";

import { getQuests } from "../../services/questService";
import { getTerritories } from "../../services/territoryService";
import { getFavoriteQuests } from "../../services/favoriteService";
import { getPlannedQuests } from "../../services/plannedService";
// Testing search-bar feature:
//  - Checking filter
//  - If correct quests/search results pop up after search

// Replace the map UI with simple containers for test.
vi.mock("react-map-gl/maplibre", () => {
  const Container = ({ children }) => <div>{children}</div>;

  return {
    default: Container,
    Marker: Container,
    Popup: Container,
    Source: Container,
    Layer: Container,
  };
});

vi.mock("maplibre-gl", () => ({
  setWorkerUrl: vi.fn(),
}));
// Mock Data
vi.mock("../../services/questService", () => ({
  getQuests: vi.fn(),
}));

vi.mock("../../services/territoryService", () => ({
  getTerritories: vi.fn(),
}));

vi.mock("../../services/favoriteService", () => ({
  getFavoriteQuests: vi.fn(),
  favoriteQuest: vi.fn(),
  unfavoriteQuest: vi.fn(),
}));

vi.mock("../../services/plannedService", () => ({
  getPlannedQuests: vi.fn(),
  planQuest: vi.fn(),
  unplanQuest: vi.fn(),
}));

vi.mock("../../services/questCompleteService", () => ({
  completeQuest: vi.fn(),
}));

vi.mock("../../services/photoService", () => ({
  getQuestPhotoUrl: vi.fn(),
}));

vi.mock("../homepage/RegionOverlay", () => ({
  default: () => null,
}));

test("searching for a location shows matching quests and hides unrelated ones", async () => {
  const user = userEvent.setup();

  getQuests.mockResolvedValue([
    {
      id: "1",
      title: "24 HOURS IN SLODOCO",
      description: "went to slodoco and never left #burymethere #noworkwasdone",
      location: {
        name: "SloDoCo",
        address: "793 Foothill Blvd, San Luis Obispo, CA 93405",
        longitude: -120,
        latitude: 35,
      },
    },
    {
      id: "2",
      title: "Art museum visit",
      description: "Explore local art",
      location: {
        name: "Downtown",
        address: "10 Main Street",
        longitude: -120,
        latitude: 35,
      },
    },
  ]);
  getTerritories.mockResolvedValue([]);
  getFavoriteQuests.mockResolvedValue([]);
  getPlannedQuests.mockResolvedValue([]);

  render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>
  );

  await user.type(screen.getByPlaceholderText(/where to/i), "slodoco");

  expect(
    await screen.findByRole("button", { name: /24 hours in slodoco/i })
  ).toBeVisible();

  expect(
    screen.queryByRole("button", { name: /art museum visit/i })
  ).not.toBeInTheDocument();
});