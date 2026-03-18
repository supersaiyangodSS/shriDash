import { Request, Response, NextFunction } from "express";
import { AuditLog } from "@/modules/users/audit/audit.model";

export const auditMiddleware = (action: string, resource: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    res.on("finish", async () => {
      try {
        await AuditLog.create({
          userId: (req as any).user?.id,
          role: (req as any).user?.role,
          action,
          resource,
          resourceId: req.params?.id,
          method: req.method,
          url: req.originalUrl,
          ip: req.ip,
        });
      } catch (error) {}
    });
    next();
  };
};
