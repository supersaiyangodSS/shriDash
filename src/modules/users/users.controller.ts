import { NextFunction, Request, Response } from "express";
import { User } from "./user.model";
import { logger } from "../../utils/logger";
import crypto from "crypto";
import mongoose from "mongoose";
import bcrypt from 'bcrypt';
