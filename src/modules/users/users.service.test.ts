import { createUser } from "./users.service";

import * as userRepo from './users.repository';

jest.mock('./users.repository');

describe("createUser service", () => {
    it("should throw error if email exists", async () => {
        (userRepo.findByEmailorUsernameRepo as jest.Mock).mockResolvedValue({
            email: 'test@gmail.com',
            username: 'other',
        });

        await expect(
            createUser({
                name: 'vedant',
                email: 'test@gmail.com',
                username: 'newuser',
                password: '123'
            })
        ).rejects.toThrow("email already exists")
    })
})