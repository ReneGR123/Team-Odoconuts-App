import { describe, it, expect } from "vitest";
import { validateQuestTitle } from "../src/utils/questValidation.js";

describe("validateQuestTitle", () => {
  it("rejects an empty quest title", () => {
    expect(validateQuestTitle("")).toBe(false);
  });

  it("rejects a quest title containing only spaces", () => {
    expect(validateQuestTitle("   ")).toBe(false);
  });
});
