import { describe, it, expect, beforeAll, afterAll, vi } from "vitest";
import { prisma } from "@/lib/db";

// Simulate "who is logged in" by mocking the session helper the route uses.
const mock = vi.hoisted<{ userId: string | null }>(() => ({ userId: null }));
vi.mock("@/lib/auth", () => ({
  getSessionUserId: async () => mock.userId,
}));
// apiMsg reads request cookies for the language, which don't exist in tests —
// stub it to just echo the key (we only assert on status codes).
vi.mock("@/lib/portal-i18n", () => ({
  apiMsg: (key: string) => key,
}));

// Import the route AFTER the mock is set up.
import { GET } from "@/app/api/support/tickets/[id]/messages/route";

/**
 * Regression test for IDOR: a logged-in client must never be able to read
 * another client's support ticket by guessing its id. Locks in the
 * ownership-scoped query (`where: { id, userId }`).
 */
describe("authorization — ticket ownership (IDOR protection)", () => {
  let ownerId = "", otherId = "", ticketId = "";

  beforeAll(async () => {
    const owner = await prisma.user.create({ data: { email: `authz-owner-${Date.now()}@test.local`, passwordHash: "x", name: "Owner" } });
    const other = await prisma.user.create({ data: { email: `authz-other-${Date.now()}@test.local`, passwordHash: "x", name: "Other" } });
    const ticket = await prisma.ticket.create({ data: { userId: owner.id, subject: "private", channel: "chat" } });
    ownerId = owner.id;
    otherId = other.id;
    ticketId = ticket.id;
  });

  afterAll(async () => {
    await prisma.ticket.deleteMany({ where: { id: ticketId } });
    await prisma.user.deleteMany({ where: { id: { in: [ownerId, otherId] } } });
    await prisma.$disconnect();
  });

  const call = (id: string) => GET(new Request("http://localhost"), { params: { id } });

  it("the owner can read their own ticket (200)", async () => {
    mock.userId = ownerId;
    expect((await call(ticketId)).status).toBe(200);
  });

  it("another logged-in user CANNOT read it (404 — no IDOR)", async () => {
    mock.userId = otherId;
    expect((await call(ticketId)).status).toBe(404);
  });

  it("an unauthenticated request is rejected (401)", async () => {
    mock.userId = null;
    expect((await call(ticketId)).status).toBe(401);
  });
});
