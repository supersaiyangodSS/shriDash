jest.mock("@/modules/auth/auth.repository");
import * as authRepo from "@/modules/auth/auth.repository";
import { loginService } from "../auth.service";
const mockRepo = jest.mocked(authRepo);

describe("loginController", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should throw error if email or password is wrong", async () => {
    (mockRepo.validateUserCredentialsRepo as jest.Mock).mockResolvedValue(null);
    const payload = {
      email: "vedant@gmail.com",
      password: "password",
    };
    await expect(loginService(payload)).rejects.toThrow("Invalid Credentials");
    expect(mockRepo.validateUserCredentialsRepo).toHaveBeenCalledWith(
      payload.email,
      payload.password,
    );
  });
});
