import { describe, it, expect } from "vitest";
import { isValidEmail } from "@/lib/validation";

// Pure unit test — no database, runs in milliseconds. Verifies logic.
describe("isValidEmail", () => {
  it("accepts a normal address", () => {
    expect(isValidEmail("doctor@praxis-muster.ch")).toBe(true);
  });

  it("rejects malformed addresses", () => {
    expect(isValidEmail("not-an-email")).toBe(false);
    expect(isValidEmail("missing-domain@")).toBe(false);
    expect(isValidEmail("a@b")).toBe(false); // no dot in the domain
  });

  it("stays fast on huge input (ReDoS-safe)", () => {
    const evil = "a".repeat(50000) + "!";
    const start = performance.now();
    isValidEmail(evil);
    expect(performance.now() - start).toBeLessThan(50);
  });
});
