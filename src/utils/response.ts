import { Response } from "express"

// FIXME: data:any

export const successResponse = (res: Response, statusCode: number, message: string, data: any) => {
    return res.status(statusCode).json({ success: true, message, data })
}
