jest.mock('@/modules/users/users.repository');

import { createUser, getUsers, softDeleteUser } from "./users.service";
import * as userRepository from "@/modules/users/users.repository";

const mockRepo = jest.mocked(userRepository);

describe('CreateUser', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should throw error if email exists", async () => {
    const mockUser = {
      'firstName': 'vedant',
      'lastName': 'kale',
      'username': 'narayan',
      'email': 'vedant@mail.com',
      'password': 'password'
    };
    (mockRepo.findByEmailorUsernameRepo as jest.Mock).mockResolvedValue(mockUser);
    await expect(createUser(mockUser)).rejects.toThrow('Email already exists');
  });

  it("should throw error is username exists", async () => {
    const inputUser = {
      'firstName': 'vedant',
      'lastName': 'kale',
      'username': 'narayan',
      'email': 'vedant99@mail.com',
      'password': 'password'
    };
    const existingUser = {
      'firstName': 'vedant',
      'lastName': 'kale',
      'username': 'narayan',
      'email': 'vedant999@mail.com',
      'password': 'password'
    };

    (mockRepo.findByEmailorUsernameRepo as jest.Mock).mockResolvedValue(existingUser);

    await expect(createUser(inputUser)).rejects.toThrow('Username already exists');
   });

   it('should return created user object', async () => {
    (mockRepo.findByEmailorUsernameRepo as jest.Mock).mockResolvedValue(null);
    const inputUser = {
      'firstName': 'vedant',
      'lastName': 'kale',
      'username': 'narayan',
      'email': 'vedant99@mail.com',
      'password': 'password'
    };

    const createdUser = {
      'firstName': 'vedant',
      'lastName': 'kale',
      'username': 'narayan',
      'email': 'vedant999@mail.com',
      'password': 'password'
    };

    (mockRepo.createUserRepo as jest.Mock).mockResolvedValue(createdUser);
    await expect(createUser(inputUser)).resolves.toEqual(createdUser);
   })
});

describe("getUsers", () => {
  it('should return users list', async () => {
    const users = [
      {
        id: '1',
        firstName: 'vedant',
        lastName: 'kale',
        username: 'narayan',
        email: 'vedant@mail.com'
      }, {
        id: '2',
        firstName: 'vedant',
        lastName: 'kale',
        username: 'narayan1',
        email: 'vedant1@mail.com'
      }
    ];
    (mockRepo.getUsersRepo as jest.Mock).mockResolvedValue(users);
    (mockRepo.countUsersRepo as jest.Mock).mockResolvedValue(2);

    await expect(getUsers(1, 10)).resolves.toEqual({ users, total: 2, page: 1, pages: 1 });
    expect(mockRepo.getUsersRepo).toHaveBeenCalledWith(10, 0);
    expect(mockRepo.countUsersRepo).toHaveBeenCalled();
  });
});

describe("softDeleteUser", () => {

  it("should throw error if user id is invalid", async () => {
    (mockRepo.findByIdRepo as jest.Mock).mockResolvedValue(null);

    await expect(softDeleteUser('1')).rejects.toThrow('User not found');
    expect(mockRepo.findByIdRepo).toHaveBeenCalledWith('1');
  });

  it("should throw error if user is already deleted", async () => {
    const mockUser = {
        id: '1',
        firstName: 'vedant',
        lastName: 'kale',
        username: 'narayan',
        email: 'vedant@mail.com'
      };

    (mockRepo.findByIdRepo as jest.Mock).mockResolvedValue(mockUser);
    (mockRepo.checkSoftDeletedUserRepo as jest.Mock).mockResolvedValue({ id: '1' });

    await expect(softDeleteUser('1')).rejects.toThrow('User is already deleted');
    expect(mockRepo.findByIdRepo).toHaveBeenCalledWith('1');
    expect(mockRepo.checkSoftDeletedUserRepo).toHaveBeenCalledWith('1');
  });

  it("should return message user deleted", async () => {
    const mockUser = {
        id: '1',
        firstName: 'vedant',
        lastName: 'kale',
        username: 'narayan',
        email: 'vedant@mail.com'
      };

      const mockResult = {
        id: '1',
        firstName: 'vedant',
        lastName: 'kale',
        username: 'narayan',
        email: 'vedant@mail.com'
      };
    (mockRepo.findByIdRepo as jest.Mock).mockResolvedValue(mockUser);
    (mockRepo.checkSoftDeletedUserRepo as jest.Mock).mockResolvedValue(null);

    (mockRepo.softDeleteUserRepo as jest.Mock).mockResolvedValue(mockResult);
    await expect(softDeleteUser('1')).resolves.toEqual(mockResult);
    expect(mockRepo.findByIdRepo).toHaveBeenCalledWith('1');
    expect(mockRepo.checkSoftDeletedUserRepo).toHaveBeenCalledWith('1');
    expect(mockRepo.softDeleteUserRepo).toHaveBeenCalledWith('1');
  })
});
