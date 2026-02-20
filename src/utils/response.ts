import { Response } from "express"

// FIXME: data:any
// FIXME: add errorResponse

export const successResponse = (res: Response, data: any) => {
    return res.json({ success: true, data })
}