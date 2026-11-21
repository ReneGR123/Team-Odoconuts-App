import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import userEvent from "@testing-library/user-event";
import { expect, test, vi } from "vitest";

import CreateQuest from "../quest/CreateQuest.jsx";
//Testing Quest Creation feature:
// - form should prevent submission when no rating is chosen
// - user should remain on form when an invalid submission is attempted

// Replace the services so the test doesn't contact the backend
vi.mock("../../services/questService", () => ({
  createQuest: vi.fn(),
}));

vi.mock("../../services/photoService", () => ({
  uploadQuestPhoto: vi.fn(),
  saveQuestPhoto: vi.fn(),
}));

test("a user cannot submit a quest without choosing a slap rating", async () => {
  const user = userEvent.setup();
  const onClose = vi.fn();

  render(
    <CreateQuest
      pickedLocation={{
        latitude: 35.2828,
        longitude: -120.6596,
      }}
      onChooseLocation={vi.fn()}
      onClose={onClose}
    />
  );

  await user.type(
    screen.getByRole("textbox", { name: /quest title/i }),
    "Explore downtown SLO"
  );

  await user.type(
    screen.getByLabelText(/describe your quest/i),
    "Walk around downtown and explore the shops."
  );

  await user.click(
    screen.getByRole("button", { name: /create quest/i })
  );

  expect(
    screen.getByRole("heading", { name: /creating quest in region/i })
  ).toBeInTheDocument();

  expect(
    screen.getByRole("radio", { name: "1 slap" })
  ).toBeInvalid();

  expect(onClose).not.toHaveBeenCalled();
});