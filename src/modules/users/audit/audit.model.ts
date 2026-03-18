import { Schema, model, Types } from "mongoose";

const auditSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: "User",
      default: null,
    },
    role: {
      type: String,
      default: "Guest",
    },
    action: {
      type: String,
      required: true,
    },
    resource: {
      type: String,
      required: true,
    },
    resourceId: {
      type: Types.ObjectId,
      default: null,
    },
    method: String,
    url: String,
    ip: String,
  },
  { timestamps: true },
);

export const AuditLog = model("AuditLog", auditSchema);
