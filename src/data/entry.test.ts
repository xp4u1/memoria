/* eslint-disable @typescript-eslint/no-explicit-any */
import { vi, describe, it, expect, beforeEach } from "vitest";
import * as uuid from "uuid";
import { generateReflectionID, generateMemoryID } from "./entry";

vi.mock("uuid", () => ({
  v4: vi.fn(),
}));

describe("entry id generators", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("generateReflectionID", () => {
    it("formats date as YYYY-MM-DD-reflection for a small-month/day (pads with zeros)", () => {
      const date = new Date(2026, 0, 5); // 2026-01-05
      const id = generateReflectionID(date);
      expect(id).toBe("2026-01-05-reflection");
    });

    it("formats date correctly for end-of-year boundary", () => {
      const date = new Date(2026, 11, 31); // 2026-12-31
      const id = generateReflectionID(date);
      expect(id).toBe("2026-12-31-reflection");
    });
  });

  describe("generateMemoryID", () => {
    it("composes id using the date and the uuid from uuid.v4", () => {
      (uuid.v4 as any).mockReturnValueOnce("fixed-uuid-1234");
      const date = new Date(2026, 4, 9); // 2026-05-09
      const id = generateMemoryID(date);
      expect(id).toBe("2026-05-09-memory-fixed-uuid-1234");
    });

    it("calls uuid.v4 each time and includes different uuids for consecutive calls", () => {
      (uuid.v4 as any)
        .mockReturnValueOnce("u-one")
        .mockReturnValueOnce("u-two");
      const date = new Date(2026, 0, 1); // 2026-01-01

      const id1 = generateMemoryID(date);
      const id2 = generateMemoryID(date);

      expect(id1).toBe("2026-01-01-memory-u-one");
      expect(id2).toBe("2026-01-01-memory-u-two");
      expect(id1).not.toBe(id2);
    });
  });
});
