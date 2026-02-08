import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export const validate = (schema: ZodSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            req.body = schema.parse(req.body);
            next();
        } catch (err: any) {
            const formatted = err.issues.reduce((acc: any, issue: any) => {
                acc[issue.path[0]] = issue.message;
                return acc;
            }, {} as Record<string, string>)
            return res.status(400).json({ message: "Validation failed", errors: formatted})
        }
    }
}