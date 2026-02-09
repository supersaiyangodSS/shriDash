import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.model";
import { logger } from "../utils/logger";
import crypto from "crypto";

// GET /api/users
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();

    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: "failed to fetch users" });
  }
};

// POST /api/users
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { firstName, lastName, email, username, password, role } = req.body;

    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User with this email or username already exists" });
    }

    const newUser = new User({
      firstName,
      lastName,
      email,
      username,
      password,
      role,
      verified: false,
      token: "",
      isTokenUsed: false,
      createdAt: new Date(),
      updated: new Date(),
    });

    const savedUser = await newUser.save();
    logger.info(`User created: ${savedUser._id}`);

    const rawToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(rawToken).digest("hex");
    savedUser.token = hashedToken;
    savedUser.isTokenUsed = false;

    await savedUser.save();
    const userResponse = savedUser.toObject();
    const { password: _, token: __, ...safeUser } = userResponse;

    return res.status(201).json({
      message: "User created successfully",
      user: safeUser,
    });
  } catch (error) {
    logger.error(`Error creating user: ${error}`);
    next(error);
  }
};
