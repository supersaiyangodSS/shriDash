import {
  createUser,
  forceDeleteUser,
  getUsers,
  restoreDeletedUser,
  softDeleteUser,
} from "./users.service";

import * as userRepository from "./users.repository";
import { AppError } from "@/errors/AppError";

jest.mock("./users.repository");

beforeEach(() => {
  jest.clearAllMocks();
});

describe("createUser", () => {
  it("should throw error if email exists", async () => {
    (userRepository.findByEmailorUsernameRepo as jest.Mock).mockResolvedValue({
      email: "test@gmail.com",
      username: "other",
    });

    await expect(
      createUser({
        name: "vedant",
        email: "test@gmail.com",
        username: "newuser",
        password: "123",
      }),
    ).rejects.toThrow("Email already exists");
  });

  it("should throw error if username exists", async () => {
    (userRepository.findByEmailorUsernameRepo as jest.Mock).mockResolvedValue({
      email: "test@gmail.com",
      username: "otherusername",
    });

    await expect(
      createUser({
        name: "vedant",
        email: "test1@gmail.com",
        username: "otherusername",
        password: "123",
      }),
    ).rejects.toThrow("Username already exists");
  });

  it("should return user created", async () => {
    const mockUser = {
      name: "vedant",
      email: "vedantnarayan@gmail.com",
      username: "otherusername",
      password: "123456789",
    };
    (userRepository.findByEmailorUsernameRepo as jest.Mock).mockResolvedValue(
      null,
    );

    (userRepository.createUserRepo as jest.Mock).mockResolvedValue(mockUser);



    const result = await createUser({
      name: "vedant",
      email: "vedantnarayan@gmail.com",
      username: "otherusername",
      password: "123456789",
    });

    expect(userRepository.createUserRepo).toHaveBeenCalledWith({
      name: "vedant",
      email: "vedantnarayan@gmail.com",
      username: "otherusername",
      password: "123456789",
    });

    expect(result).toEqual(mockUser);
  });
});

describe("getUsers", () => {
  it("should return pagination users list", async () => {
    const mockUsers = [
      { id: 1, name: "vedant" },
      { id: 2, name: "narayan" },
    ];

    (userRepository.getUsersRepo as jest.Mock).mockResolvedValue(mockUsers);
    (userRepository.countUsersRepo as jest.Mock).mockResolvedValue(10);

    const result = await getUsers(2, 2);
    expect(userRepository.getUsersRepo).toHaveBeenCalledWith(2, 2);

    expect(userRepository.countUsersRepo).toHaveBeenCalled();

    expect(result).toEqual({
      users: mockUsers,
      total: 10,
      page: 2,
      pages: 5,
    });
  });
});

describe("softDeleteUser", () => {
  it("should throw error if user not found", async () => {
    (userRepository.softDeleteUserRepo as jest.Mock).mockResolvedValue(null);

    await expect(softDeleteUser("1")).rejects.toThrow("User not found");
    expect(userRepository.softDeleteUserRepo).toHaveBeenCalledWith('1');
});

it("should return deleted user", async () => {
    const deletedUser = {
        id: "1",
        name: "vedant",
        deleted: true,
        deletedAt: "date",
    };
    (userRepository.softDeleteUserRepo as jest.Mock).mockResolvedValue(
        deletedUser,
    );
    const result = await softDeleteUser("1");
    expect(userRepository.softDeleteUserRepo).toHaveBeenCalledWith("1");
    expect(result).toEqual(deletedUser);
  });
});

describe("forceDeleteUser", () => {
    it("should error if user not found", async () => {
    (userRepository.forceDeleteUserRepo as jest.Mock)
    .mockResolvedValue(null);

    await expect(forceDeleteUser('123')).rejects.toThrow('User not found');
    expect(userRepository.forceDeleteUserRepo).toHaveBeenCalledWith('123');
    });

    it("should delete user", async () => {
        const mockUser = {
            _id: '123',
            email: 'test@gmail.com'
        };

        (userRepository.forceDeleteUserRepo as jest.Mock)
        .mockResolvedValue(mockUser);

        const result = await forceDeleteUser('123');
        expect(userRepository.forceDeleteUserRepo).toHaveBeenCalledWith('123');
        expect(result).toEqual(mockUser);
    })
})

describe("restoreUser", () => {
  it("should throw error if user not found", async () => {
      (userRepository.restoreDeleteUserRepo as jest.Mock).mockResolvedValue(null);

      const promise = restoreDeletedUser('123');

    await expect(promise)
    .rejects.toThrow("User not found");

    await expect(promise)
    .rejects.toBeInstanceOf(AppError);
  });

  it("should restore user when user exists", async () => {
    const mockUser = {
      _id: "123",
      email: "test@gmail.com",
      deleted: false,
    };
    (userRepository.restoreDeleteUserRepo as jest.Mock).mockResolvedValue(
      mockUser,
    );

    const result = await restoreDeletedUser("123");
    expect(userRepository.restoreDeleteUserRepo).toHaveBeenCalledWith("123");
    expect(result).toEqual(mockUser);
  });
});
