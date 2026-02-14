import { InferSchemaType, Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import { ROLES } from "../../constants/roles";

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: true,
    },
    lastName: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      required: true,
      index: true,
    },
    username: {
      type: String,
      unique: true,
      trim: true,
      required: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      enum: Object.values(ROLES),
      default: ROLES.USER,
      index: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    token: {
      type: String,
      select: false,
    },
    isTokenUsed: {
      type: Boolean,
      default: false,
    },
    deleted: {
      type: Boolean,
      default: false,
      index: true,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (password: string) {
     return bcrypt.compare(password, this.password);
}

export type User = InferSchemaType<typeof userSchema>;

export const User = model("User", userSchema);
