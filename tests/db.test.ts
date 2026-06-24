import { describe, it, expect, afterAll } from "vitest";
import { prisma } from "@/lib/db";

// Integration test — needs a real Postgres (the CI "service", or your local DB).
// Proves the migrations applied, Prisma connects, and basic CRUD works.
describe("database (Prisma + Postgres)", () => {
  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("connects and the User table exists (migrations applied)", async () => {
    const count = await prisma.user.count();
    expect(count).toBeGreaterThanOrEqual(0);
  });

  it("can create and read back a user", async () => {
    const email = `ci-${Date.now()}@test.local`;
    const created = await prisma.user.create({
      data: { email, passwordHash: "placeholder", name: "CI Test" },
    });
    const found = await prisma.user.findUnique({ where: { email } });
    expect(found?.name).toBe("CI Test");

    await prisma.user.delete({ where: { id: created.id } }); // clean up after itself
  });
});
