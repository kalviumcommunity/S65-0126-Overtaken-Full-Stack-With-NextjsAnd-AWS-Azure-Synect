import { apiFetch } from "./api-client";

describe("apiFetch", () => {
  it("returns data for success envelope", async () => {
    const mockFetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        success: true,
        message: "ok",
        data: { id: "123" },
        timestamp: new Date().toISOString(),
      }),
    });

    global.fetch = mockFetch as unknown as typeof fetch;

    const result = await apiFetch<{ id: string }>("/api/health");
    expect(result.id).toBe("123");
  });

  it("throws for failed envelope", async () => {
    const mockFetch = jest.fn().mockResolvedValue({
      ok: false,
      json: async () => ({
        success: false,
        message: "Unauthorized",
        data: null,
        timestamp: new Date().toISOString(),
      }),
    });

    global.fetch = mockFetch as unknown as typeof fetch;

    await expect(apiFetch("/api/auth/me")).rejects.toThrow("Unauthorized");
  });
});
