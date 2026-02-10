import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.model";
import { logger } from "../utils/logger";
import crypto from "crypto";
import mongoose from "mongoose";
import bcrypt from 'bcrypt';

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

// PUT /api/users/:id
export const editUser = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    console.log(req.params.id)

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid user id" });
    }

    const updateData: any = { ...req.body }

    if (updateData.username) {
      const existingUsername = await User.findOne({
        username: updateData.username,
        _id: { $ne: id }
      });

      if (existingUsername) {
        return res.status(409).json({ success: false, message: "Username already exists" })
      }
    }

    if (updateData.email) {
      const existingEmail = await User.findOne({
        email: updateData.email,
        _id: { $ne: id }
      })

      if (existingEmail) {
        return res.status(409).json({
          success: false,
          message: "Email already exists"
        })
      }
    }

    if (updateData.password) {
      const user = await User.findById(id).select('+password');
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found!' })
      }
      const isSamePassword = await bcrypt.compare(updateData.password, user.password)

      if (!isSamePassword) {
        const salt = await bcrypt.genSalt(10);
        updateData.password = await bcrypt.hash(updateData.password, salt);
      }
      else {
        delete updateData.password
      }
    }

    updateData.updatedAt = new Date();

    const updatedUser = await User.findByIdAndUpdate(
      id, updateData,
      {
        new: true,
        runValidators: true
      }
    ).select("-password -token");

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found!" });
    }

    res.status(200).json({ success: true, message: "User updated successfully", data: updatedUser })
  } catch (error) {
    logger.error(`Error updating user: ${error}`);
    next(error);
  }
}
