import { Sevekari } from "../sevekari.model";
import { createSevekari } from "../sevekari.service";

jest.mock("../sevekari.model", () => ({
  Sevekari: {
    exists: jest.fn(),
    create: jest.fn(),
  },
}));

describe("createSevekari", () => {
  const existsMock = Sevekari.exists as jest.Mock;
  const createMock = Sevekari.create as jest.Mock;
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("it should throw error if mobile already exists", async () => {
    existsMock.mockResolvedValue(true);
    const mockUser = {
      toObject: jest.fn().mockReturnValue({
        mobile: "1234567890",
      }),
    };
    createMock.mockResolvedValue(mockUser);
    const payload = {
      mobile: "1234567890",
    } as any;
    const result = await createSevekari(payload);
    expect(existsMock).toHaveBeenCalledWith({ mobile: payload.mobile });
    expect(createMock).toHaveBeenCalledWith(payload);
    expect(result).toEqual({
      mobile: "1234567890",
    });
  });
});
